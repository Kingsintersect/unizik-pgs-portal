export const ADMIN_SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard/admin",
    icon: "HomeIcon",
  },
  {
    title: "User Management",
    path: "/dashboard/admin/users",
    icon: "GraduationCap",
    submenu: true,
    submenuItems: [
      { title: "User / Roles", path: "/dashboard/admin/users" },
      { title: "Bulk Upload", path: "/dashboard/admin/users/bulkupload" },
      {
        title: "Tutors Enrolment",
        path: "/dashboard/admin/users/tutors-enrollment",
      },
    ],
  },
  {
    title: "Course Management",
    path: "/dashboard/admin/course-management/faculty",
    icon: "BookOpenIcon",
    submenu: true,
    submenuItems: [
      { title: "Faculty", path: "/dashboard/admin/course-management/faculty" },
      {
        title: "Department",
        path: "/dashboard/admin/course-management/department",
      },
      {
        title: "Course Categories",
        path: "/dashboard/admin/course-management/course-categories",
      },
      { title: "Courses", path: "/dashboard/admin/course-management/courses" },
      {
        title: "Courses Assignment",
        path: "/dashboard/admin/course-management/course-assignment",
      },
    ],
  },
  {
    title: "Rigion Management",
    path: "/dashboard/admin/region/countries",
    icon: "MapPinIcon",
    submenu: true,
    submenuItems: [
      { title: "Country", path: "/dashboard/admin/region/countries" },
      { title: "State", path: "/dashboard/admin/region/states" },
      { title: "Local Gov", path: "/dashboard/admin/region/local-gov" },
    ],
  },
];
export const STUDENT_SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard/student",
    icon: "HomeIcon",
  },
  {
    title: "My Account",
    path: "/dashboard/student/profile",
    icon: "UserIcon",
  },
];

export const CreditLoads: CreditLoad[] = [
  { id: "1", score: "1" },
  { id: "2", score: "2" },
  { id: "3", score: "3" },
  { id: "4", score: "4" },
  { id: "5", score: "5" },
];

export const Gender = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export const StudyLevels = [
  // { label: "Level 100", value: "100" },
  // { label: "Level 200", value: "200" },
  // { label: "Level 300", value: "300" },
  // { label: "Level 400", value: "400" },
  // { label: "Level 500", value: "500" },
  // { label: "Level 600", value: "600" },
  { label: "Level 700", value: "700", program: "MAS" },
  { label: "Level 800", value: "800", program: "PHD" },
  { label: "Level 900", value: "900", program: "PGDE" },
];

export const Semesters = [
  { label: "First Semester", value: "1SM" },
  { label: "Second Semester", value: "2SM" },
];

export const certificateType = [
  { label: "WAEC", value: "WAEC" },
  { label: "NECO", value: "NECO" },
  { label: "NABTEB", value: "NABTEB" },
  { label: "GCE", value: "GCE" },
];

export const educationalLevelList = [
  { label: "Bachalors Of Science", value: "Bsc" },
  { label: "Higher National Diploma", value: "HND" },
];

export const LocalGovAreaList = [
  { label: "Enugu North", value: "Enugu North" },
  { label: "Enugu South", value: "Enugu South" },
  { label: "Igboeze North", value: "Igboeze North" },
];

export const Religion = [
  { label: "Christianity", value: "Christianity" },
  { label: "Islamic", value: "Islamic" },
];

export const YesOrNo = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

export const OLevels = [
  { label: "NABTEB", value: "NABTEB" },
  { label: "NECO(JUNE/JULY)", value: "NECO(JUNE/JULY)" },
  { label: "NECO(NOV/DEC)", value: "NECO(NOV/DEC)" },
  { label: "WAEC(JUNE/JULY)", value: "WAEC(JUNE/JULY)" },
  { label: "WAEC(NOV/DEC)", value: "WAEC(NOV/DEC)" },
  { label: "RSA", value: "RSA" },
  { label: "TC II", value: "TC II" },
];

export const Years = [
  { label: "1960", value: "1960" },
  { label: "1961", value: "1961" },
  { label: "1962", value: "1962" },
  { label: "1963", value: "1963" },
  { label: "1964", value: "1964" },
  { label: "1965", value: "1965" },
  { label: "1966", value: "1966" },
  { label: "1967", value: "1967" },
  { label: "1968", value: "1968" },
  { label: "1969", value: "1969" },
  { label: "1970", value: "1970" },
  { label: "1971", value: "1971" },
  { label: "1972", value: "1972" },
  { label: "1973", value: "1973" },
  { label: "1974", value: "1974" },
  { label: "1975", value: "1975" },
  { label: "1976", value: "1976" },
  { label: "1977", value: "1977" },
  { label: "1978", value: "1978" },
  { label: "1979", value: "1979" },
  { label: "1980", value: "1980" },
  { label: "1981", value: "1981" },
  { label: "1983", value: "1983" },
  { label: "1984", value: "1984" },
  { label: "1985", value: "1985" },
  { label: "1986", value: "1986" },
  { label: "1987", value: "1987" },
  { label: "1988", value: "1988" },
  { label: "1989", value: "1989" },
  { label: "1990", value: "1990" },
  { label: "1991", value: "1991" },
  { label: "1992", value: "1992" },
  { label: "1993", value: "1993" },
  { label: "1994", value: "1994" },
  { label: "1995", value: "1995" },
  { label: "1996", value: "1996" },
  { label: "1997", value: "1997" },
  { label: "1998", value: "1998" },
  { label: "1999", value: "1999" },
  { label: "2000", value: "2000" },
  { label: "2001", value: "2001" },
  { label: "2002", value: "2002" },
  { label: "2003", value: "2003" },
  { label: "2004", value: "2004" },
  { label: "2005", value: "2005" },
  { label: "2006", value: "2006" },
  { label: "2007", value: "2007" },
  { label: "2008", value: "2008" },
  { label: "2009", value: "2009" },
  { label: "2010", value: "2010" },
  { label: "2011", value: "2011" },
  { label: "2012", value: "2012" },
  { label: "2013", value: "2013" },
  { label: "2014", value: "2014" },
  { label: "2015", value: "2015" },
  { label: "2016", value: "2016" },
  { label: "2017", value: "2017" },
  { label: "2018", value: "2018" },
  { label: "2019", value: "2019" },
  { label: "2020", value: "2020" },
  { label: "2021", value: "2021" },
  { label: "2022", value: "2022" },
  { label: "2023", value: "2023" },
  { label: "2024", value: "2024" },
];

export const courses: Subject[] = [
  { id: 1, label: "English", value: "English" },
  { id: 2, label: "Mathematics", value: "Mathematics" },
  { id: 3, label: "Chemistry", value: "Chemistry" },
  { id: 4, label: "Physics", value: "Physics" },
  { id: 5, label: "Agriculture", value: "Agriculture" },
  { id: 6, label: "Biology", value: "Biology" },
  { id: 7, label: "Economics", value: "Economics" },
  { id: 8, label: "Food and Nutrition", value: "Food and Nutrition" },
  { id: 9, label: "Further Mathematics", value: "Further Mathematics" },
  { id: 10, label: "Geography", value: "Geography" },
  { id: 11, label: "Igbo", value: "Igbo" },
  { id: 12, label: "Hausa", value: "Hausa" },
  { id: 13, label: "Yoruba", value: "Yoruba" },
  { id: 14, label: "Civic Education", value: "Civic Education" },
  { id: 15, label: "Commerce", value: "Commerce" },
];

export const grades: Grade[] = [
  { id: 1, label: "A1", value: "A1" },
  { id: 2, label: "B2", value: "B2" },
  { id: 3, label: "B3", value: "B3" },
  { id: 4, label: "C4", value: "C4" },
  { id: 5, label: "C5", value: "C5" },
  { id: 6, label: "C6", value: "C6" },
  { id: 7, label: "D7", value: "D7" },
  { id: 8, label: "E8", value: "E8" },
  { id: 9, label: "F9", value: "F9" },
];
export const Program: Program[] = [
  { id: 1, label: "Post Graduste Diploma", value: "PGD" },
  { id: 1, label: "Masters Degree", value: "MASTERS" },
  { id: 1, label: "Doctorate Degree", value: "PHD" },
  { id: 1, label: "Professional Dregree", value: "PROFESSOR" },
  // { id: 1, label: "Ordinary Level", value: "O'Level" },
  // { id: 2, label: "Advaced Level", value: "A'Level" },
  // { id: 3, label: "Ordiary National Diplomer", value: "OND" },
  // { id: 4, label: "Higher National Diplomer", value: "HND" },
  // { id: 5, label: "Bachalor's of science", value: "Bsc" },
];

export const Nationality: any[] = [
  { id: 1, label: "Nigerian", value: "Nigeria" },
  { id: 2, label: "Other", value: "other" },
];

export const State: any[] = [
  { id: 1, label: "Abia", value: "Abia State" },
  { id: 2, label: "Adamawa", value: "Adamawa Statae" },
  { id: 3, label: "Akwa Ibom", value: "Akwa Ibom Statae" },
  { id: 4, label: "Anambra", value: "Anambra Statae" },
  { id: 5, label: "Bauchi", value: "Bauchi Statae" },
  { id: 6, label: "Bayelsa", value: "Bayelsa Statae" },
  { id: 7, label: "Benue", value: "Benue Statae" },
  { id: 8, label: "Borno", value: "Borno Statae" },
  { id: 9, label: "Cross River", value: "Cross River Statae" },
  { id: 10, label: "Delta", value: "Delta Statae" },
  { id: 11, label: "Ebonyi", value: "Ebonyi Statae" },
  { id: 12, label: "Edo", value: "Edo Statae" },
  { id: 13, label: "Ekiti", value: "Ekiti Statae" },
  { id: 14, label: "Enugu", value: "Enugu Statae" },
  { id: 15, label: "Gombe", value: "Gombe Statae" },
  { id: 16, label: "Imo", value: "Imo Statae" },
  { id: 36, label: "Jigawa", value: "Jigawa Statae" },
  { id: 17, label: "Kaduna", value: "Kaduna Statae" },
  { id: 18, label: "Kano", value: "Kano Statae" },
  { id: 19, label: "Katsina", value: "Katsina Statae" },
  { id: 20, label: "Kebbi", value: "Kebbi Statae" },
  { id: 21, label: "Kogi", value: "Kogi Statae" },
  { id: 22, label: "Kwara", value: "Kwara Statae" },
  { id: 23, label: "Lagos", value: "lagos Statae" },
  { id: 24, label: "Nasarawa", value: "Nasarawa Statae" },
  { id: 25, label: "Ogun", value: "Ogun Statae" },
  { id: 26, label: "Ondo", value: "Ondo Statae" },
  { id: 27, label: "Osun", value: "Osun Statae" },
  { id: 28, label: "Oyo", value: "Oyo Statae" },
  { id: 29, label: "Plateau", value: "Plateau Statae" },
  { id: 30, label: "Rivers", value: "Rivers Statae" },
  { id: 31, label: "Sokoto", value: "Sokoto Statae" },
  { id: 32, label: "Taraba", value: "Taraba Statae" },
  { id: 33, label: "Yobe", value: "Yobe Statae" },
  { id: 34, label: "Zamfara", value: "Zamfara Statae" },
  {
    id: 35,
    label: "Federal Capital Territory",
    value: "Federal Capital Territory Statae",
  },
];
