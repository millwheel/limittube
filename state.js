const DEFAULT_MAXIMUM_USAGE_SECOND = 30 * 60;

export const appState = {
    maximumUsageSecond: DEFAULT_MAXIMUM_USAGE_SECOND,
    activeYouTubeTabs: new Set(),
    blockStatus: false,
};
