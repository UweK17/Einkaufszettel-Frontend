import React, {useState} from 'react';

const Dropdown = () => {

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleMenuOne = () => {
    setOpen(false);
  }

  const handleMenuTwo = () => {
    setOpen(false);
  }

  return (
    <div className='dropdown'>
      <button onClick={handleOpen}>Dropdown</button>
      {open ? (
        <ul className="menu">
          <li className="menu-item">
            <button onClick={handleMenuOne}>Menu 1</button>
          </li>
          <li className="menu-item">
            <button onClick={handleMenuTwo}>Menu 2</button>
          </li>
        </ul>
      ) : null}
      {open ? <div>Is Open</div> : <div>Is Closed</div>}
    </div>
  );
};

export default Dropdown;