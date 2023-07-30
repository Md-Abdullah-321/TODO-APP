const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const AuthenticateUser = require('../middleware/authentication');
const cookieParser = require('cookie-parser');
const app = express();


// Parse cookies before your custom middleware
app.use(cookieParser());

// Parse application/Json:
const jsonParser = bodyParser.json();
router.use(jsonParser);

// Connect DB:
require('../db/connection');

// Add all of your Schema: 
const User = require('../model/userSchema');

// Home Route: Fetch todos for an authenticated user
router.get('/todos', AuthenticateUser, async (req, res) => {
  try {
    // Find the authenticated user by their UserId
    const user = await User.findById(req.UserId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with the user's todos array
    res.status(200).json(user.todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// SignUp Page: Register a new user
router.post('/signup', jsonParser, async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.json({ error: "Please, fill the Registration form" });
  }

  // Check if the user already exists or not: 
  const userEmail = await User.findOne({ email });

  if (userEmail) {
    // If the user exists, return an error:
    return res.status(422).json({ error: 'User Already Exists' });
  }

  try {
    const user = new User({ name, email, phone, password });

    await user.save();
    res.status(201).json({ message: "New User Created Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// SignIn Route: Log in an existing user
router.post('/signin', jsonParser, async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogin = await User.findOne({ email: email });

    if (!email || !password) {
      return res.status(400).json({ error: 'Please, fill in the data' });
    }

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid Credentials' });
      }

      const token = await userLogin.generateAuthToken();

      // Set the JWT token in a cookie
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        httpOnly: true,
        secure: true, // Set this to true if using HTTPS
        sameSite: 'none', // Set this for cross-site requests
      });

      res.json({token,  message: 'User Sign In Successfully' , name: userLogin.name});
    } else {
      res.status(400).json({ error: 'Invalid Credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to log in' });
  }
});


// Todo-Route: Create a new todo for an authenticated user
router.post('/todo', AuthenticateUser, jsonParser, async (req, res) => {
  try {
    const { task, dueDate } = req.body;

    // Find the authenticated user by their UserId
    const user = await User.findById(req.UserId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add the new todo to the user's todos array
    user.todos.push({task, dueDate});

    // Save the updated user with the new todo
    await user.save();

    res.status(201).json({ message: 'Todo created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// Delete Todo-Route: Delete a todo for an authenticated user
router.delete('/todo/:todoId', AuthenticateUser, async (req, res) => {
  try {
    const todoId = req.params.todoId;
    console.log(todoId);
    // Find the authenticated user by their UserId
    const user = await User.findById(req.UserId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the index of the todo to be deleted in the todos array
    const todoIndex = user.todos.findIndex(todo => todo._id.toString() === todoId);
    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Remove the todo from the todos array
    user.todos.splice(todoIndex, 1);

    // Save the updated user with the todo removed
    await user.save();

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Edit Todo-Route: Edit a todo for an authenticated user
router.put('/todo/:todoId', AuthenticateUser, jsonParser, async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const { task, dueDate, priority } = req.body;

    // Find the authenticated user by their UserId
    const user = await User.findById(req.UserId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the todo to be edited in the todos array
    const todoIndex = user.todos.findIndex(todo => todo._id.toString() === todoId);
    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Update the todo properties if provided in the request body
    if (task) user.todos[todoIndex].task = task;
    if (dueDate) user.todos[todoIndex].dueDate = dueDate;
    if (priority) user.todos[todoIndex].priority = priority;

    // Save the updated user with the todo edited
    await user.save();

    res.status(200).json({ message: 'Todo edited successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to edit todo' });
  }
});

// Logout Route: Clear the JWT token from the cookie
router.get('/logout', (req, res) => {
  res.clearCookie('jwtoken', { path: '/' })
  res.status(200).send("Logged out successfully");
});

module.exports = router;
