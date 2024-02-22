import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [datas, setDatas] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    author: '',
    subject: '',
    date: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    subjects: '',
    publish: '',
  });
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    axios.get("https://library-management-2-ri59.onrender.com/").then(res => {
      setDatas(res.data);
    }).catch(err => console.log(err));
  }, [filters]);

  const authors = [...new Set(datas.map((item:any) => item.author))];
  const titles = [...new Set(datas.map((item:any) => item.title))];
  const subjects = [...new Set(datas.map((item:any) => item.subjects))];
  const dates = [...new Set(datas.map((item:any) => item.publish))];

  const filteredItems = datas.filter((item:any) => {
    return (
      (filters.title === '' || item.title === filters.title) &&
      (filters.author === '' || item.author === filters.author) &&
      (filters.subject === '' || item.subjects === filters.subject) &&
      (filters.date === '' || item.publish === filters.date)
    );
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteritems = filteredItems.slice(startIndex, endIndex);

  const handlePageChange = (page:any) => {
    setCurrentPage(page);
  };

  const openAddBookModal = () => {
    setIsAddBookModalOpen(true);
  };

  const closeAddBookModal = () => {
    setIsAddBookModalOpen(false);
    setNewBook({
      title: '',
      author: '',
      subjects: '',
      publish: '',
    });
  };

  const handleAddBook = () => {
    axios.post("https://library-management-2-ri59.onrender.com/add-book", newBook)
      .then(response => {
        setDatas(response.data);
        closeAddBookModal();
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <div style={{ padding: '20px' }}>
        <label htmlFor="title" className="form-label text-white">
          Title
        </label>
        <select
          id="title"
          onChange={(event) => setFilters({ ...filters, title: event.target.value })}
          className="form-select mb-3"
        >
          <option value="">Select Title</option>
          {titles.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <label htmlFor="author" className="form-label text-white">
          Authors
        </label>
        <select
          id="author"
          onChange={(event) => setFilters({ ...filters, author: event.target.value })}
          className="form-select mb-3"
        >
          <option value="">Select Author</option>
          {authors.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <label htmlFor="subject" className="form-label text-white">
          Subject
        </label>
        <select
          id="subject"
          onChange={(event) => setFilters({ ...filters, subject: event.target.value })}
          className="form-select mb-3"
        >
          <option value="">Select Subject</option>
          {subjects.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <label htmlFor="dates" className="form-label text-white">
          Publishing date
        </label>
        <select
          id="dates"
          onChange={(event) => setFilters({ ...filters, date: event.target.value })}
          className="form-select mb-4"
        >
          <option value="">Select Date</option>
          {dates.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={openAddBookModal}>
          Add Book
        </button>
        <table className="table table-bordered table-striped table-hover text-white">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Subject</th>
              <th scope="col">Publishing date</th>
            </tr>
          </thead>
          <tbody>
            {filteritems.map((item:any, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.subjects}</td>
                <td>{item.publish}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-white">Total Books Available: {filteredItems.length}</p>
      </div>
        <div className="modal" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Book</h5>
                <button type="button" className="btn-close" onClick={closeAddBookModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label>Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newBook.title}
                      onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Author</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newBook.author}
                      onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Subjects</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newBook.subjects}
                      onChange={(e) => setNewBook({ ...newBook, subjects: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Publishing Date</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newBook.publish}
                      onChange={(e) => setNewBook({ ...newBook, publish: e.target.value })}
                    />
                  </div>
                  <button type="button" className="btn btn-primary" onClick={handleAddBook}>
                    Add Book
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default Home;
