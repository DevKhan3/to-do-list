import React, { useState } from 'react';

export default function Todo() {
  const [name, setName] = useState();
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const handleAdd = () => {
    if (!name) {
    } else if (name && !toggle) {
      setData(
        data.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: name };
          }
          return elem;
        })
      );
      setToggle(true);
      setName('');
      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: name,
      };
      setData([...data, allInputData]);
      setName('');
    }
  };

  const handleEdit = (id) => {
    let newEditItem = data.find((elem) => {
      return elem.id === id;
    });
    setToggle(false);
    setName(newEditItem.name);
    setIsEditItem(id);
  };

  const handleDelete = (index) => {
    var newData = data.filter((elem, i) => {
      if (index !== i) {
        return elem;
      }
    });
    setData(newData);
  };

  return (
    <div>
      <nav>
        <div>
          <input
            type='text'
            value={name}
            placeholder='Enter Your Task'
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          {toggle ? (
            <button onClick={handleAdd}> Add Task </button>
          ) : (
            <button onClick={handleAdd}> Save </button>
          )}
        </div>
      </nav>

      <div>
        {data.map((task, index) => (
          <p key={index}>
            <div>
              {task.name}

              <button onClick={() => handleEdit(task.id)}> Update </button>
              <button onClick={() => handleDelete(index)}> Delete </button>
            </div>
          </p>
        ))}
      </div>
    </div>
  );
}
