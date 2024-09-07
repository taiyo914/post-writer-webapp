import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import useSettingsModalStore from "../store/settingsModalStore";

const SettingsButton = () => {
  const { toggleModal } = useSettingsModalStore();

  return (
    <button
      onClick={toggleModal}
      className="cursor-pointer flex items-center text-gray-500"
    >
      <AdjustmentsHorizontalIcon className="h-6 w-6 text-gray-400" />
      フィルター
    </button>
  );
};

export default SettingsButton;

