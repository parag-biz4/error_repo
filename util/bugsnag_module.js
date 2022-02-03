import Bugsnag from "@bugsnag/react-native";

export const error_reporting_start = () => {
    Bugsnag.start();
}
