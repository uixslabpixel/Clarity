/**
 * Image slots for the template's static sections. Swap any path here (or drop
 * new files into public/images) to rebrand. CMS-managed entries (posts, cases,
 * services, team, testimonials) carry their own image fields instead.
 * Library files are WebP with an -800 variant used for small screens.
 */
const lib = (name: string) => `/images/lib/${name}.webp`;

export const img = {
  heroTowers: lib('hero-towers'),
  officeBw: lib('office-bw'),
  meetingLaptop: lib('meeting-laptop'),
  peopleTopdown: lib('people-topdown'),
  meetingGlass: lib('meeting-glass'),
  officeBright: lib('office-bright'),
  whiteboard: lib('whiteboard'),
  meetingPresentation: lib('meeting-presentation'),
  teamTable: lib('team-table'),
  teamTableDark: lib('team-table-dark'),
  facadeGrid: lib('facade-grid'),
  facadeFins: lib('facade-fins'),
  facadeAngle: lib('facade-angle'),
  towerBlock: lib('tower-block'),
  towerRound: lib('tower-round'),
  towersBlue: lib('towers-blue'),
  glassPrism: lib('glass-prism'),
  buildingConcrete: lib('building-concrete'),
  officeWhiteboardTeam: lib('office-whiteboard-team'),
  portraitOffice: lib('portrait-office'),
  portraitDesk: lib('portrait-desk'),
  facadeGlass: lib('facade-glass'),
  towerBlue: lib('tower-blue'),
  towersSky: lib('towers-sky'),
  glassTowerUp: lib('glass-tower-up'),
};

/** Accordion images for PILLAR-01, in pillar order. */
export const pillarImages = [img.meetingLaptop, img.peopleTopdown, img.meetingGlass, img.officeBright];
/** Step images for PROCESS-02/03, in step order. */
export const processImages = [img.peopleTopdown, img.whiteboard, img.meetingGlass, img.meetingLaptop];
/** Social-proof avatars (forms, avatar stacks). */
export const avatars = ['avatar-teal', 'avatar-grey', 'avatar-white', 'avatar-blue', 'avatar-orange'].map(lib);
/** Tall architectural shots used on the About reach dial. */
export const reachImages = [img.facadeGlass, img.towerBlue, img.towersSky];
