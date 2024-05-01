document.addEventListener('DOMContentLoaded', () => {
    const createPostForm = document.getElementById('create-post-form');
    const updatePostForm = document.getElementById('update-post-form'); 
    const postsList = document.getElementById('posts-list');
  
    // Función para crear una nueva publicación
    const createPost = async (title, description, banner, author, tags) => {
      try {
        const response = await fetch('https://api.tiburoncin.lat/22272/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, description, banner, author, tags })
        });
  
        if (!response.ok) {
          throw new Error('Failed to create post');
        }
  
        const newPost = await response.json();
        return newPost;
      } catch (error) {
        console.error('Error creating post:', error);
        throw error;
      }
    };
  
    // Función para actualizar una publicación
    const updatePost = async (postId, title, banner, description, tags) => {
      try {
        const response = await fetch(`https://api.tiburoncin.lat/22272/posts/${postId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, banner, description, tags })
        });
  
        if (!response.ok) {
          throw new Error('Failed to update post');
        }
  
        const updatedPost = await response.json();
        return updatedPost;
      } catch (error) {
        console.error('Error updating post:', error);
        throw error;
      }
    };
  
    // Función para eliminar una publicación
    const deletePost = async (postId) => {
      try {
        const response = await fetch(`https://api.tiburoncin.lat/22272/posts/${postId}`, {
          method: 'DELETE'
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete post');
        }
  
        return 'Post deleted successfully';
      } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
      }
    };
  
    // Función para mostrar todas las publicaciones existentes
    const displayPosts = async () => {
      try {
        const response = await fetch('https://api.tiburoncin.lat/22272/posts');
        const posts = await response.json();
  
        postsList.innerHTML = '';
        posts.forEach(post => {
          const li = document.createElement('li');
          li.innerHTML = `
            <div>Title: ${post.title}</div>
            <div>Description: ${post.description}</div>
            <div>Banner: ${post.banner}</div>
            <div>Tags: ${post.tags}</div>
            <button class="update-btn" data-id="${post.id}">Update</button>
            <button class="delete-btn" data-id="${post.id}">Delete</button>
          `;
          postsList.appendChild(li);
        });
  
        // Agregar event listeners a los botones de actualizar y eliminar
        const updateButtons = document.querySelectorAll('.update-btn');
        updateButtons.forEach(button => {
          button.addEventListener('click', () => {
            const postId = button.dataset.id;
            const liElement = button.parentElement;
            const title = liElement.querySelector('div:nth-child(1)').innerText.split(': ')[1];
            const description = liElement.querySelector('div:nth-child(2)').innerText.split(': ')[1];
            const banner = liElement.querySelector('div:nth-child(3)').innerText.split(': ')[1];
            const tags = liElement.querySelector('div:nth-child(4)').innerText.split(': ')[1];
  
            // Poblar el formulario de actualización con los datos del post seleccionado
            document.getElementById('update-title').value = title;
            document.getElementById('update-description').value = description;
            document.getElementById('update-banner').value = banner;
            document.getElementById('update-tags').value = tags;
  
            // Mostrar el formulario de actualización
            updatePostForm.style.display = 'block';
          });
        });
  
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
          button.addEventListener('click', async () => {
            const postId = button.dataset.id;
            const confirmation = confirm('Are you sure you want to delete this post?');
            if (confirmation) {
              try {
                const result = await deletePost(postId);
                console.log(result);
                await displayPosts();
              } catch (error) {
                console.error('Error deleting post:', error);
              }
            }
          });
        });
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    // Event listener para enviar el formulario de creación de publicación
    createPostForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const banner = document.getElementById('banner').value;
      const author = document.getElementById('author').value;
      const tags = document.getElementById('tags').value;
  
      try {
        await createPost(title, description, banner, author, tags);
        createPostForm.reset();
        await displayPosts();
      } catch (error) {
        console.error('Error creating post:', error);
      }
    });

    // Event listener para enviar el formulario de actualización de publicación
  updatePostForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const postId = document.getElementById('update-post-id').value; // Agregar un campo oculto para almacenar el ID del post
    const title = document.getElementById('update-title').value;
    const description = document.getElementById('update-description').value;
    const banner = document.getElementById('update-banner').value;
    const tags = document.getElementById('update-tags').value;

    try {
      await updatePost(postId, title, banner, description, tags);
      updatePostForm.reset();
      updatePostForm.style.display = 'none'; // Ocultar el formulario de actualización después de enviarlo
      await displayPosts();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  });
  
    // Mostrar las publicaciones existentes al cargar la página
    displayPosts();
  });
