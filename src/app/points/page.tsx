import PageMarginContainer from "@/components/ui/pageMarginContainer";
import PointsHeaders from "./__components__/pointsHeaders";
import PointsTable from "./__components__/pointsTable";

export default function Page() {
  return (
    <PageMarginContainer className="text-white ">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Reactor Points</h1>
        <p className="text-gray-400 mt-1">Track your Reactor Points</p>
      </div>
      <PointsHeaders />
      <div className="mt-12 px-4 md:px-8 lg:px-16 overflow-x-auto">
        <PointsTable />
      </div>
    </PageMarginContainer>
  );
}
