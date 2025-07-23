const GAMES_ZZZ_SETTINGS_UID = {
  title: 'Anddriuu UID',
  id: 'copy-uid',
  color: 'var(--color-black)',
};

const GAMES_ZZZ_SETTINGS_LATEST_VIDEOS = {
  title: 'Ultimos Videos',
  id: 'latest-videos',
  color: 'var(--color-yellow)',
};

const GAMES_ZZZ_SETTINGS_LATEST_PULLS = {
  title: 'Historial de Tiradas',
  id: 'latest-pulls',
  color: 'var(--color-gray)',
};

const GAMES_ZZZ_SETTINGS_WARPS_PER_PATCH = {
  title: 'Tiradas por versión',
  id: 'warps-per-patch',
  color: 'var(--color-blue-light)',
  url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTiSx8OSyx-BZktnpT-fh_pQHjjkD8q3sp3Csy2aOI-8CV_QroqxzhhNjiCZNV4IdzhyK3xbipZn9WD/pubhtml',
};

const GAMES_ZZZ_SETTINGS_WARPS_PER_SHOWCASE = {
  title: 'Showcase',
  id: 'showcase',
  color: 'var(--color-red)',
  //url: 'https://enka.network/zzz/1500713525/', Para evitar muchas request
  url: '',
};

export const GAMES_ZZZ_SETTINGS = {
  PAGE_SECTIONS: [GAMES_ZZZ_SETTINGS_UID, GAMES_ZZZ_SETTINGS_LATEST_VIDEOS, GAMES_ZZZ_SETTINGS_LATEST_PULLS, GAMES_ZZZ_SETTINGS_WARPS_PER_PATCH, GAMES_ZZZ_SETTINGS_WARPS_PER_SHOWCASE],
};
