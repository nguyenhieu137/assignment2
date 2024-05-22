import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { addCategory, deleteCategory } from '../../redux/categoriesSlice';
import { deleteTasksByCategory } from '../../redux/tasksSlice';
import './sidebar.scss';
import ava from '../../assets/images/cat-ava.jpg';
import { MdTask } from "react-icons/md";

const Sidebar: React.FC = () => {
  const [color, setColor] = useState<string>("#ff0000");
  const [newCategory, setNewCategory] = useState<string>("");

  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories.categories);

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const handleSaveCategory = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (newCategory.trim() === "") return;

    const newTaskCategory = { color, name: newCategory };
    dispatch(addCategory(newTaskCategory));
    setNewCategory("");
    setColor("#ff0000");
  };

  const handleDeleteCategory = (index: number) => {
    const category = categories[index];
    dispatch(deleteCategory(index));
    dispatch(deleteTasksByCategory(category.name));
  };

  return (
    <div className='section-1'>
      <div className="section-1__wrapper">
        <div className="user-info">
          <img src={ava} alt="Avatar" />
          <div className='user-text'>
            <p>Jason Nguyen</p>
            <p>Todo List</p>
          </div>
        </div>

        <div className="filter-section">
          <Link to='/' className='title'>
            <MdTask className='task-ic' />Today Task
          </Link>
          <div className="filter-task">
            {categories.length > 0 ? (
                categories.map((category, index) => (
                  <div className="filter-item" key={index}>
                    <div className='filter-name'>
                      <div style={{ background: category.color }} className='dot'></div>
                      <p>{category.name}</p>
                    </div>
                    <button className="delete-btn" onClick={() => handleDeleteCategory(index)}>Delete</button>
                  </div>
                ))
                ) : (
                <p className="no-category-message">Bạn chưa có mục việc nào !</p>
            )}
          </div>
          <div className='add-filter'>
            <input type='color' value={color} onChange={handleColorChange} />
            <input
              type="text"
              className='input-filter'
              placeholder='Add new filter...'
              value={newCategory}
              onChange={handleCategoryChange}
            />
            <button className='add-filter__btn' onClick={handleSaveCategory}>Save</button>
          </div>
        </div>

        <div className="action-btn">
          <Link to='/create' className='add-task__btn'>Create new task</Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;





