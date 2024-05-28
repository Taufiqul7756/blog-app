import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";

export const getPaginationControls = (page, totalPages, setPage) => {
  const controls = [];

  // Left Arrow
  controls.push(
    <button
      key="left-arrow"
      className="mx-2 text-2xl  "
      onClick={() => page > 1 && setPage(page - 1)}
      disabled={page === 1}
    >
      <CiCircleChevLeft />
    </button>
  );

  // Page Numbers in Ascending Order
  for (let i = 1; i <= totalPages; i++) {
    controls.push(
      <button
        key={i}
        className={` mx-2 text-xl ${
          page === i ? " text-white" : " text-blue-500"
        }`}
        onClick={() => setPage(i)}
      >
        {i}
      </button>
    );
  }

  // Right Arrow
  controls.push(
    <button
      key="right-arrow"
      className=" mx-2 text-2xl "
      onClick={() => page < totalPages && setPage(page + 1)}
      disabled={page === totalPages}
    >
      <CiCircleChevRight />
    </button>
  );

  return controls;
};
