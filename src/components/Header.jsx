const Header = ({ showCreateTask, setShowCreateTask }) => {
  return (
    <header className='header'>
      <h1 className='header__title'>Task tracker</h1>
      <button className='header__show-btn btn btn--icon' onClick={() => setShowCreateTask((prev) => !prev)}>
        {showCreateTask ? 'Hide' : 'Add'}
        {showCreateTask ? <i className='fa-solid fa-minus' /> : <i className='fa-solid fa-plus' />}
      </button>
    </header>
  );
};

export default Header;
