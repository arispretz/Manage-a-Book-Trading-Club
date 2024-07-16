// routes/userRoutes.mjs
import express from 'express';
import { getUsers, getUserBooks, getUserRequests } from '../controllers/userController.mjs';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', getUsers);
router.get('/:userId/books', getUserBooks);
router.get('/:userId/requests', getUserRequests);

export default router;
/*
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear el body de las solicitudes
app.use(bodyParser.json());

// Simulación de una base de datos de usuarios y libros
let users = [
    { username: 'usuario1', fullName: 'Usuario 1', profilePicture: 'user1.jpg', books: ['Libro 1', 'Libro 2'] },
    { username: 'usuario2', fullName: 'Usuario 2', profilePicture: 'user2.jpg', books: ['Libro 3'] }
];

// Endpoint para obtener el perfil de un usuario
app.get('/api/user-profile/:username', (req, res) => {
    const { username } = req.params;
    // Buscar el usuario en la base de datos (simulada)
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Filtrar qué información se envía basado en si el usuario está autenticado o no
    let publicProfile = {
        username: user.username,
        fullName: user.fullName,
        profilePicture: user.profilePicture
    };

    if (req.isAuthenticated()) {
        // Si el usuario está autenticado, puede ver la lista de libros completa
        publicProfile.books = user.books;
    } else {
        // Si no está autenticado, no se muestra la lista completa de libros
        publicProfile.booksCount = user.books.length;
    }

    res.json(publicProfile);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
*/
