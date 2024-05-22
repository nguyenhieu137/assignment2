import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.scss';
import ava from '../../assets/images/cat-ava.jpg';
import { MdTask } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";

interface TaskCategory {
  color: string;
  name: string;
}

const Sidebar: React.FC = () => {
  const [color, setColor] = useState<string>("#ff0000");
  const [newCategory, setNewCategory] = useState<string>("");

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const [categories, setCategories] = useState<TaskCategory[]>(() => {
    // Lấy dữ liệu từ localStorage khi component được khởi tạo
    const storedCategories = localStorage.getItem("taskCategories");
    return storedCategories ? JSON.parse(storedCategories) : [];
  });

  const handleSaveCategory = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (newCategory.trim() === "") return;

    const newTaskCategory = { color, name: newCategory };
    const updatedCategories = [...categories, newTaskCategory];

    setCategories(updatedCategories);
    setNewCategory("");
    setColor("#ff0000");

    // Lưu danh sách loại công việc vào localStorage
    localStorage.setItem("taskCategories", JSON.stringify(updatedCategories));
  };

  return (
    <div className='container'>
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
              {categories.map((category, index) => (
                  
                  <div className="filter-item">
                      <p key={index} style={{ color: category.color }}>{category.name}</p>
                      <button key={index} className="delete-btn">Delete</button>
                  </div>
                  
              ))}
            </div>
            <div className='add-filter'>
              {/* <IoAddOutline className='add-filter__ic' /> */}
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
    </div>
  );
}

export default Sidebar;

