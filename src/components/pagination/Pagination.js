import chevronLeft from '../../assets/icons/chevron-left.svg';
import chevronRight from '../../assets/icons/chevron-right.svg';

const Pagination = ({ handlePagination, pageIndex }) => (
  <div className='card-control'>
    <button
      data-testid='prev-button'
      onClick={handlePagination}
      className={pageIndex ? '' : 'hidden'}
    >
      <img src={chevronLeft} alt='chevron left' />
      Prev page
    </button>
    <button
      data-testid='next-button'
      onClick={handlePagination}
      className={!pageIndex ? '' : 'hidden'}
    >
      Next page
      <img src={chevronRight} alt='chevron right' />
    </button>
  </div>
);

export default Pagination;
