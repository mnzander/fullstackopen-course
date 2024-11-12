import { fireEvent, render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
    const blog = {
        title: 'Testing is done with react-testing-library',
        author: "testing",
        url: "testing",
    };

    render(<Blog blog={blog} />)

    // Busca el título dentro de la etiqueta span
    const element = screen.getByText(
        (content, element) => 
            element?.tagName.toLowerCase() === 'span' && content.includes(blog.title)
    )

    expect(element).toBeInTheDocument()
});

test('renders blog title and author', () => {
    const blog = {
      title: 'Test Blog',
      author: 'John Doe'
    };
  
    render(<Blog blog={blog} />);
  
    expect(screen.getByText('Test Blog - John Doe')).toBeInTheDocument();
});

test('toggles blog details visibility', () => {
    const blog = {
      title: 'Test Blog Title',
      author: 'John Doe',
      url: 'https://example.com',
      likes: 10,
    };
  
    render(<Blog blog={blog} />);
    
    fireEvent.click(screen.getByText('view'));
  
    expect(screen.getByText(/https:\/\/.*\.com/)).toBeInTheDocument();
    expect(screen.getByText(/likes:\s*\d+/)).toBeInTheDocument();
});

test('clicking the button calls event handler once', async () => {
    const blog = {
        id: 1232312312323,
        title: 'Test Blog Title',
        author: 'John Doe',
        url: 'https://example.com',
        likes: 10,
      };
  
    const mockHandler = vi.fn()
  
    render(
      <Blog blog={blog} handleBlogLikes={mockHandler} />
    )
  
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(2)
});