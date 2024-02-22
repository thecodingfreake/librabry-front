import React, { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';

interface Book {
  id: number;
  title: string;
  author: string;
  subjects: string;
  publish: string;
}


const Home: React.FC = () => {
  const [datas, setDatas] = useState<Book[]>([]);
 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [newBook, setNewBook] = useState<Book>({
    id: 0,
    title: '',
    author: '',
    subjects: '',
    publish: '',
  });

  const itemsPerPage = 5;

  useEffect(() => {
    axios.get<Book[]>("https://library-management-2-ri59.onrender.com/")
      .then(res => setDatas(res.data))
      .catch(err => console.log(err));
  }, []);


 

  const totalPages = Math.ceil(datas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteritems = datas.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleAddBook = () => 
  {
    console.log(newBook)
    axios.post<Book>("https://library-management-2-ri59.onrender.com/add-book", newBook)
      .then(() => {
        setDatas([...datas, newBook]);
        setNewBook({
          id: 0,
          title: '',
          author: '',
          subjects: '',
          publish: '',
        });
        console.log(datas)
      })
      .catch((error) => {
        console.error('Error adding book:', error);
      });
  };

  const handleDeleteBook = (bookId: number) => {
    axios.delete(`https://library-management-2-ri59.onrender.com/delete-book/${bookId}`)
      .then(() => {
        setDatas(datas.filter(item => item.id !== bookId));
      })
      .catch((error) => {
        console.error('Error deleting book:', error);
      });
  };

  return (
    <>
      <div style={{ padding: '20px' }}>
        {/* Addition Form */}
        <div style={{ marginBottom: '20px', maxWidth: '400px', margin: '0 auto', background: '#f4f4f4', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add a New Book</h2>
          <form style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: '8px' }}>ID:</label>
            <input type="number" name="id" value={newBook.id} onChange={handleInputChange} />

            <label style={{ marginBottom: '8px', marginTop: '8px' }}>Title:</label>
            <input type="text" name="title" value={newBook.title} onChange={handleInputChange} />

            <label style={{ marginBottom: '8px', marginTop: '8px' }}>Author:</label>
            <input type="text" name="author" value={newBook.author} onChange={handleInputChange} />

            <label style={{ marginBottom: '8px', marginTop: '8px' }}>Subjects:</label>
            <input type="text" name="subjects" value={newBook.subjects} onChange={handleInputChange} />

            <label style={{ marginBottom: '8px', marginTop: '8px' }}>Publishing date:</label>
            <input type="text" name="publish" value={newBook.publish} onChange={handleInputChange} />

            <button
              style={{
                marginTop: '16px',
                padding: '10px',
                cursor: 'pointer',
                backgroundColor: '#ff0000',
                color: '#ffffff',
                border: 'none',
                borderRadius: '5px',
                transition: 'background-color 0.3s, color 0.3s',
              }}
              type="button"
              onClick={handleAddBook}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#cc0000';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#ff0000';
              }}
            >
              Add Book
            </button>
          </form>
        </div>



        {/* Deletion Form */}
        <div>
          <h2>Delete a Book</h2>
          <table className="table table-bordered table-striped table-hover text-white">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Subjects</th>
                <th scope="col">Publishing date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteritems.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td>{item.subjects}</td>
                  <td>{item.publish}</td>
                  <td>
                    <button onClick={() => handleDeleteBook(item.id)} style={{backgroundColor:"red",color:"white"}}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(index + 1)} >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-white">Total Books Available: {datas.length}</p>
      </div>
    </>
  );
};

export default Home;
