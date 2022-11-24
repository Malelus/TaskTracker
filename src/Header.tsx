type HeaderProps = {
  isDarkActive: boolean;
  toggleMode: () => void;
  showCreateTask: boolean;
  toggleCreateTask: () => void;
};

const Header = ({ isDarkActive, toggleMode, showCreateTask, toggleCreateTask }: HeaderProps) => {
  return (
    <header className='header'>
      <h1 className='header__title'>Task tracker</h1>

      <section className='header__control'>
        <button className='header__show-btn btn btn--icon' onClick={toggleCreateTask}>
          {showCreateTask ? 'Hide' : 'Add'}
          {showCreateTask ? <i className='fa-solid fa-minus' /> : <i className='fa-solid fa-plus' />}
        </button>

        <button onClick={toggleMode} className='header__toggle-btn btn'>
          {isDarkActive ? <i className='fa-solid fa-moon' /> : <i className='fa-solid fa-sun' />}
        </button>
      </section>
    </header>
  );
};

export default Header;
