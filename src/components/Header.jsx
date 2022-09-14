const Header = ({ darkTheme, toggleTheme, showCreateTask, setShowCreateTask }) => {
  return (
    <header className='header'>
      <h1 className='header__title'>Task tracker</h1>

      <section className='header__buttons'>
        <button className='header__show-btn btn btn--icon' onClick={() => setShowCreateTask((prev) => !prev)}>
          {showCreateTask ? 'Hide' : 'Add'}
          {showCreateTask ? <i className='fa-solid fa-minus' /> : <i className='fa-solid fa-plus' />}
        </button>

        <button onClick={() => toggleTheme((prev) => !prev)} className='header__toggle-btn btn'>
          {darkTheme ? <i className='fa-solid fa-moon' /> : <i className='fa-solid fa-sun' />}
        </button>
      </section>
    </header>
  );
};

export default Header;
