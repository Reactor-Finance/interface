import PointsHeaders from "./__components__/pointsHeaders";
import PointsTable from "./__components__/pointsTable";

export default function Page() {
  return (
    <div className="text-white ">
      <div className="mt-12 text-center">
        <h1 className="text-3xl font-bold text-white">Reactor Points</h1>
        <p className="text-gray-400 mt-1">Track your Reactor Points</p>
      </div>
      <PointsHeaders />
      <div className="mt-12 px-4 md:px-8 lg:px-16 overflow-x-auto">
        <PointsTable />
        <div className="flex justify-between mt-4 text-sm text-gray-400">
          <p>
            Page 1 of 34&nbsp;|&nbsp;
            <span className="underline cursor-pointer text-[#4F515A] text-xs">
              (1 - 250 results)
            </span>
          </p>
          <div className="flex items-center space-x-4">
            <button>
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button>
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
