import React from 'react';
import { Link } from 'react-router-dom';
import './home.scss';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

function Home() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const calculateDaysLeft = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft >= 0 ? daysLeft : 0;
  };

  return (
    <div className='todo-list'>
      <div className="todo-container">
        <Sidebar />
        <div className="col-layout">
          <div className='search-container'>
            <input type="search" name="" id="" placeholder='Tìm task ...'/>
          </div>
          <div className="task-list__container">
            {tasks.map(task => (
              <Link to={`/create/${task.id}`} key={task.id} className="item">
                <div className="item-info">
                  <span>{task.name}</span>
                  <span>{task.category}</span>
                </div>
                <div className="item-deadline">
                  <span>Deadline: {task.deadline}</span>
                  <span>Còn {calculateDaysLeft(task.deadline)} ngày</span>
                </div>
                <div className="item-status">
                  <span style={{ color: task.status === 'Chưa hoàn thành' ? 'red' : 'green' }}>{task.status}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
