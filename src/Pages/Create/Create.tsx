import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { addTask, updateTask, deleteTask } from '../../redux/tasksSlice';
import { v4 as uuidv4 } from 'uuid';
import './create.scss';
import Sidebar from '../../Components/Sidebar/Sidebar';


function Create() {
  const { taskId } = useParams<{ taskId: string }>();
  const task = useSelector((state: RootState) => state.tasks.tasks.find(task => task.id === taskId));
  
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [status, setStatus] = useState<string>("Chưa hoàn thành");

  const categories = useSelector((state: RootState) => state.categories.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleDeadlineChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDeadline(e.target.value);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !description || !deadline || !selectedCategory) return;

    // Dispatch action to add task to store
    const id = uuidv4();
    dispatch(addTask({ id, name, description, deadline, category: selectedCategory, status }));

    // Reset input fields after submitting
    setName("");
    setDescription("");
    setDeadline("");
    setSelectedCategory("");
    setStatus("Chưa hoàn thành");
    navigate("/");
  };

  const handleUpdate = () => {
    if (!taskId) return; 

    // Thực hiện cập nhật task
    dispatch(updateTask({ id: taskId, name, description, deadline, category: selectedCategory, status }));
    navigate("/");
  };

  const handleDelete = () => {
    if (!taskId) return;
    // Thực hiện xóa task
    dispatch(deleteTask(taskId));
    navigate("/");
  };

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDescription(task.description);
      setDeadline(task.deadline);
      setSelectedCategory(task.category);
      setStatus(task.status);
    }
  }, [task]);

  return (
    <div className='create-container'>
      <div className="create-wrapper">
        <Sidebar />
        <div className="create-section">
          <div className="create-title">
            Create Task Page
          </div>

          <form className="create-form" onSubmit={handleSubmit}>
            <div className="field">
              <span>Name</span>
              <input type="text" className='ip-title' value={name} onChange={handleNameChange}/>
            </div>
            <div className="field">
              <span>Description</span>
              <textarea name="" id="" className='ip-des' value={description} onChange={handleDescriptionChange}></textarea>
            </div>
            <div className="field">
              <span>Deadline</span>
              <input type="date" value={deadline} onChange={handleDeadlineChange} />
            </div>
            <div className="field">
              <span>Choose Category</span>
              <select name="" id="" className='ip-category' value={selectedCategory} onChange={handleCategoryChange}>
                {categories.length > 0 ? (
                  categories.map((category, index) => (
                    <option key={index} value={category.name}>{category.name}</option>
                  ))
                ) : (
                  <option value="" disabled>Vui lòng thêm task category</option>
                )}
              </select>
            </div>
            <div className='status'>
              <span>Status</span>
              <div className="radio-item">
                <input
                  name="status"
                  type="radio"
                  value="Chưa hoàn thành"
                  checked={status === "Chưa hoàn thành"}
                  onChange={handleStatusChange}
                />
                <label>Chưa hoàn thành</label>
              </div>
              <div className="radio-item">
                <input
                  name="status"
                  type="radio"
                  value="Hoàn thành"
                  checked={status === "Hoàn thành"}
                  onChange={handleStatusChange}
                />
                <label>Hoàn thành</label>
              </div>
            </div>
            
            {taskId ? (
                <div className="create-action__btn">
                  <button className='update-btn' onClick={handleUpdate}>Update</button>
                  <button className='delete-btn' onClick={handleDelete}>Delete</button>
                </div>
              ) : (
                <div className="create-action__btn">
                  <button type="submit" className='create-btn'>Create</button>
                </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;

