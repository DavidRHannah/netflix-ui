import ReasonToJoin from "./ReasonToJoin";
import TvIcon from "@mui/icons-material/Tv";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import AddReactionIcon from "@mui/icons-material/AddReaction";

export default function ReasonsToJoin() {
  return (
    <div className="reasons-to-join mt-12 relative items-center flex flex-col w-fit">
      <div className="self-start">
        <span className="reasons-to-join-text text-white font-semibold text-2xl md:text-3xl">
          More Reasons to Join
        </span>
      </div>
      <div className="reasons-to-join-container xl:w-6xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 mt-4 ml-2 mr-2">
        <ReasonToJoin
          title="Enjoy on your TV"
          subtext="Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more."
          icon={<TvIcon className="text-white scale-225 mr-4 mb-3" />}
        />
        <ReasonToJoin
          title="Download your shows to watch offline"
          subtext="Save your favorites easily and always have something to watch."
          icon={
            <DownloadForOfflineIcon className="text-white scale-225 mr-4 mb-3" />
          }
        />
        <ReasonToJoin
          title="Watch everywhere"
          subtext="Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV."
          icon={
            <TravelExploreIcon className="text-white scale-225 mr-4 mb-3" />
          }
        />
        <ReasonToJoin
          title="Create profiles for kids"
          subtext="Send kids on adventures with their favorite characters in a space made just for them — free with your membership."
          icon={<AddReactionIcon className="text-white scale-225 mr-4 mb-3" />}
        />
      </div>
    </div>
  );
}
