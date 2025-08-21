import ReasonToJoin from "./ReasonToJoin";
import TvIcon from "@mui/icons-material/Tv";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import { useLanguage } from "../../contexts/LanguageContext";

export default function ReasonsToJoin() {
  const { t } = useLanguage();

  return (
    <div className="reasons-to-join mt-12 relative items-center flex flex-col w-fit">
      <div className="self-start">
        <span className="reasons-to-join-text text-white font-semibold text-2xl md:text-3xl">
          {t("reasons.title")}
        </span>
      </div>
      <div className="reasons-to-join-container xl:w-6xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 mt-4 ml-2 mr-2">
        <ReasonToJoin
          title={t("reasons.enjoyTv.title")}
          subtext={t("reasons.enjoyTv.description")}
          icon={<TvIcon className="text-white scale-225 mr-4 mb-3" />}
        />
        <ReasonToJoin
          title={t("reasons.download.title")}
          subtext={t("reasons.download.description")}
          icon={
            <DownloadForOfflineIcon className="text-white scale-225 mr-4 mb-3" />
          }
        />
        <ReasonToJoin
          title={t("reasons.watchEverywhere.title")}
          subtext={t("reasons.watchEverywhere.description")}
          icon={
            <TravelExploreIcon className="text-white scale-225 mr-4 mb-3" />
          }
        />
        <ReasonToJoin
          title={t("reasons.kidsProfiles.title")}
          subtext={t("reasons.kidsProfiles.description")}
          icon={<AddReactionIcon className="text-white scale-225 mr-4 mb-3" />}
        />
      </div>
    </div>
  );
}
