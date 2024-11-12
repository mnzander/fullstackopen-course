import { render, screen } from '@testing-library/react';
import BlogForm from './BlogForm';
import userEvent from '@testing-library/user-event';

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = vi.fn();
    const user = userEvent.setup();
  
    render(<BlogForm createBlog={createBlog} />)
  
    const titleInput = screen.getByPlaceholderText("write blog title here");
    const authorInput = screen.getByPlaceholderText("write blog author here");
    const urlInput = screen.getByPlaceholderText("write blog url here");
    const sendButton = screen.getByText('create');
  
    await user.type(titleInput, 'testing a form...');
    await user.type(authorInput, 'testing a form...');
    await user.type(urlInput, 'testing a form...');
    await user.click(sendButton);
  
    // Verificar que se llama exactamente una vez y con los argumentos esperados
    expect(createBlog).toHaveBeenCalledTimes(1);
    expect(createBlog).toHaveBeenCalledWith('testing a form...', 'testing a form...', 'testing a form...');
  
    // Verificar que los estados internos se limpian correctamente
    expect(screen.getByPlaceholderText("write blog title here")).toHaveValue('');
    expect(screen.getByPlaceholderText("write blog author here")).toHaveValue('');
    expect(screen.getByPlaceholderText("write blog url here")).toHaveValue('');
  });