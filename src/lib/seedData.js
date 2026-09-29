// Fictional demo data for Grace Seventh-day Adventist Church.
// All names, contacts, and figures are invented for prototype demonstration.

export const CHURCH = {
  name: "Grace Seventh-day Adventist Church",
  tagline: "A community of faith, hope, and love",
  address: "123 Riverside Drive, Nairobi, Kenya",
  phone: "+254 700 123 456",
  email: "hello@gracesda.org",
  service_times: [
    { day: "Sabbath", time: "9:00 AM", label: "Sabbath School" },
    { day: "Sabbath", time: "11:00 AM", label: "Divine Worship" },
    { day: "Wednesday", time: "6:00 PM", label: "Prayer Meeting" },
    { day: "Friday", time: "6:30 PM", label: "Vespers" },
  ],
  mission: "To make disciples of Jesus Christ, nurturing a community of faith, service, and fellowship in the Adventist tradition.",
  vision: "A growing, Christ-centered family reflecting God's love to our city and beyond.",
};

export const MINISTRIES = [
  { name: "Sabbath School", slug: "sabbath-school", category: "Discipleship", leader: "Peter Maina", leader_email: "sabbathschool@gracesda.org", members_count: 85, color: "#2f6b54", meeting_day: "Sabbath", meeting_time: "9:00 AM", location: "Main Sanctuary", featured: true, description: "Bible study and discussion for all ages, the heart of Sabbath morning learning." },
  { name: "Children's Ministry", slug: "childrens-ministry", category: "Children", leader: "Esther Nyambura", leader_email: "children@gracesda.org", members_count: 42, color: "#c98a3d", meeting_day: "Sabbath", meeting_time: "9:00 AM", location: "Children's Hall", featured: true, description: "Nurturing children (ages 3–12) in Bible stories, songs, and Christian values." },
  { name: "Youth Ministry", slug: "youth-ministry", category: "Youth", leader: "Brian Ochieng", leader_email: "youth@gracesda.org", members_count: 38, color: "#3d7ac9", meeting_day: "Sabbath", meeting_time: "4:00 PM", location: "Youth Hall", featured: true, description: "Empowering young people to live Christ-centered lives through fellowship and service." },
  { name: "Pathfinder Club", slug: "pathfinder-club", category: "Youth", leader: "David Kiptoo", leader_email: "pathfinders@gracesda.org", members_count: 27, color: "#7a4dc9", meeting_day: "Sabbath", meeting_time: "2:00 PM", location: "Church Grounds", featured: false, description: "Adventure, skills, and character-building club for ages 10–15." },
  { name: "Women's Ministry", slug: "womens-ministry", category: "Adult", leader: "Faith Wambui", leader_email: "women@gracesda.org", members_count: 31, color: "#c93d8a", meeting_day: "Sunday", meeting_time: "3:00 PM", location: "Fellowship Hall", featured: false, description: "Encouraging women in spiritual growth, mentorship, and community outreach." },
  { name: "Men's Ministry", slug: "mens-ministry", category: "Adult", leader: "Joseph Mutua", leader_email: "men@gracesda.org", members_count: 24, color: "#4d5c7a", meeting_day: "Sunday", meeting_time: "5:00 PM", location: "Fellowship Hall", featured: false, description: "Building men of integrity through fellowship, prayer, and service." },
  { name: "Prayer Ministry", slug: "prayer-ministry", category: "Spiritual", leader: "Ruth Adhiambo", leader_email: "prayer@gracesda.org", members_count: 19, color: "#9a3dc9", meeting_day: "Wednesday", meeting_time: "6:00 PM", location: "Prayer Room", featured: false, description: "Intercessory prayer and spiritual renewal for the church and community." },
  { name: "Health Ministry", slug: "health-ministry", category: "Outreach", leader: "Dr. Alice Kamau", leader_email: "health@gracesda.org", members_count: 16, color: "#3dc96e", meeting_day: "Sunday", meeting_time: "10:00 AM", location: "Community Room", featured: false, description: "Promoting wholistic health through education, screening, and lifestyle programs." },
  { name: "Personal Ministries", slug: "personal-ministries", category: "Outreach", leader: "Samuel Otieno", leader_email: "outreach@gracesda.org", members_count: 22, color: "#c9883d", meeting_day: "Sabbath", meeting_time: "2:00 PM", location: "Main Sanctuary", featured: false, description: "Equipping members for evangelism and community service." },
  { name: "Music & Choir", slug: "music-choir", category: "Worship", leader: "Lydia Cherono", leader_email: "music@gracesda.org", members_count: 28, color: "#c95a3d", meeting_day: "Sabbath", meeting_time: "11:00 AM", location: "Choir Loft", featured: true, description: "Leading the congregation in sacred music and worship through the choir." },
  { name: "Community Services", slug: "community-services", category: "Outreach", leader: "Margaret Njeri", leader_email: "community@gracesda.org", members_count: 14, color: "#3dc9b8", meeting_day: "Tuesday", meeting_time: "4:00 PM", location: "Service Center", featured: false, description: "Serving the neighborhood with food, clothing, and practical care." },
];

const fn = ["Samuel","Daniel","Peter","Brian","David","Joseph","Ruth","Esther","Mercy","Grace","Faith","Lydia","Alice","Margaret","John","James","Simon","Andrew","Mary","Martha","Esther","Joy","Peace","Hope","Mercy","Dorcas","Deborah","Naomi","Sarah","Rebecca"];
const ln = ["Mwangi","Otieno","Maina","Ochieng","Kiptoo","Wambui","Mutua","Adhiambo","Kamau","Njeri","Cherono","Achieng","Nyambura","Wanjiru","Kamau","Korir","Onyango","Wafula","Chebet","Mutiso"];

export const MEMBERS = Array.from({ length: 30 }, (_, i) => {
  const first = fn[i % fn.length];
  const last = ln[i % ln.length];
  const gender = i % 2 === 0 ? "male" : "female";
  const ministriesPool = ["Sabbath School","Children's Ministry","Youth Ministry","Music & Choir","Prayer Ministry","Women's Ministry","Men's Ministry","Personal Ministries","Health Ministry","Community Services"];
  const mins = [ministriesPool[i % ministriesPool.length], ministriesPool[(i + 3) % ministriesPool.length]];
  const statuses = ["active","active","active","active","inactive","baptism_candidate"];
  const roles = ["Member","Member","Member","Elder","Deacon","Deaconess","Sabbath School Teacher","Choir Member","Treasurer","Clerk"];
  return {
    church_id: "grace-sda",
    full_name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
    phone: `+254 7${(i + 10) % 99} ${100 + i} ${200 + i * 3}`,
    photo_url: "",
    gender,
    date_of_birth: `19${50 + (i % 45)}-0${(i % 9) + 1}-1${i % 9}`,
    membership_status: statuses[i % statuses.length],
    date_joined: `20${10 + (i % 12)}-0${(i % 12) + 1}-1${i % 9}`,
    baptism_date: i % 5 === 0 ? "" : `20${12 + (i % 10)}-0${(i % 12) + 1}-2${i % 9}`,
    ministries: mins,
    church_role: roles[i % roles.length],
    address: `${100 + i} Riverside ${["Crescent","Drive","Lane","Avenue"][i % 4]}, Nairobi`,
    occupation: ["Teacher","Nurse","Engineer","Accountant","Farmer","Business Owner","Doctor","Student","Clerk","Pastor"][i % 10],
    spouse: i % 3 === 0 ? `${fn[(i + 5) % fn.length]} ${last}` : "",
    children: i % 2 === 0 ? [`${fn[(i+2)%fn.length]} Jr`, `${fn[(i+7)%fn.length]} Jr`] : [],
    notes: "",
  };
});

export const EVENTS = [
  { title: "Sabbath Divine Worship", description: "Weekly worship service with sermon, music, and fellowship.", date: "2026-10-03", time: "11:00 AM", end_time: "12:30 PM", venue: "Main Sanctuary", ministry: "Church", organizer: "Pr. Samuel Mwangi", status: "upcoming", registration_required: false, category: "Worship" },
  { title: "Youth Sabbath", description: "A special Sabbath led by the youth ministry with music and testimony.", date: "2026-10-10", time: "11:00 AM", end_time: "12:30 PM", venue: "Main Sanctuary", ministry: "Youth Ministry", organizer: "Brian Ochieng", status: "upcoming", registration_required: false, category: "Youth" },
  { title: "Midweek Prayer Meeting", description: "Bible study and intercessory prayer.", date: "2026-09-30", time: "6:00 PM", end_time: "7:00 PM", venue: "Prayer Room", ministry: "Prayer Ministry", organizer: "Ruth Adhiambo", status: "upcoming", registration_required: false, category: "Prayer" },
  { title: "Children's Day", description: "A celebration of children with special program and activities.", date: "2026-10-17", time: "9:00 AM", end_time: "12:00 PM", venue: "Children's Hall", ministry: "Children's Ministry", organizer: "Esther Nyambura", status: "upcoming", registration_required: true, category: "Children" },
  { title: "Community Outreach", description: "Distributing food and clothing to the neighborhood.", date: "2026-10-04", time: "9:00 AM", end_time: "1:00 PM", venue: "Service Center", ministry: "Community Services", organizer: "Margaret Njeri", status: "upcoming", registration_required: true, category: "Outreach" },
  { title: "Choir Practice", description: "Weekly choir rehearsal for Sabbath music.", date: "2026-10-02", time: "6:00 PM", end_time: "7:30 PM", venue: "Choir Loft", ministry: "Music & Choir", organizer: "Lydia Cherono", status: "upcoming", registration_required: false, category: "Music" },
  { title: "Pathfinder Camp", description: "Weekend camping and skills adventure for Pathfinders.", date: "2026-10-24", time: "8:00 AM", end_time: "5:00 PM", venue: "Karen Campsite", ministry: "Pathfinder Club", organizer: "David Kiptoo", status: "upcoming", registration_required: true, category: "Youth" },
  { title: "Health Expo", description: "Free health screening and lifestyle education for the community.", date: "2026-10-11", time: "10:00 AM", end_time: "3:00 PM", venue: "Community Room", ministry: "Health Ministry", organizer: "Dr. Alice Kamau", status: "upcoming", registration_required: false, category: "Health" },
  { title: "Women's Fellowship Brunch", description: "Fellowship, sharing, and spiritual encouragement for women.", date: "2026-10-05", time: "3:00 PM", end_time: "5:00 PM", venue: "Fellowship Hall", ministry: "Women's Ministry", organizer: "Faith Wambui", status: "upcoming", registration_required: true, category: "Adult" },
  { title: "Board Meeting", description: "Monthly church board meeting for leaders.", date: "2026-10-08", time: "6:30 PM", end_time: "8:00 PM", venue: "Board Room", ministry: "Church", organizer: "Pr. Samuel Mwangi", status: "upcoming", registration_required: false, category: "Administration" },
  { title: "Sabbath School Convention", description: "Training and inspiration for Sabbath School teachers.", date: "2026-09-19", time: "2:00 PM", end_time: "5:00 PM", venue: "Main Sanctuary", ministry: "Sabbath School", organizer: "Peter Maina", status: "completed", registration_required: false, category: "Discipleship" },
];

export const ANNOUNCEMENTS = [
  { title: "Welcome to our new members", body: "We rejoice as five new members join our church family this Sabbath. Please warmly welcome them during fellowship lunch.", audience: "entire_church", author: "Pr. Samuel Mwangi", date: "2026-09-28", status: "published" },
  { title: "Children's Day registration open", body: "Parents, please register your children for Children's Day on October 17. Sign up at the welcome desk or online.", audience: "members", author: "Esther Nyambura", date: "2026-09-27", status: "published", ministry: "Children's Ministry" },
  { title: "Choir rehearsal moved to Friday", body: "This week's choir rehearsal moves to Friday at 6:30 PM. Please arrive on time.", audience: "ministry", author: "Lydia Cherono", date: "2026-09-26", status: "published", ministry: "Music & Choir" },
  { title: "Quarterly finance report available", body: "The Q3 treasury report is available for review by the board. Please contact the treasurer with questions.", audience: "members", author: "Grace Wanjiru", date: "2026-09-25", status: "published" },
  { title: "Community outreach volunteers needed", body: "We need 15 volunteers for the October 4 community outreach. Sign up at the personal ministries desk.", audience: "entire_church", author: "Samuel Otieno", date: "2026-09-24", status: "published" },
  { title: "Pathfinder camp packing list", body: "Pathfinders, please collect the camp packing list from the director. All forms due October 20.", audience: "ministry", author: "David Kiptoo", date: "2026-09-23", status: "published", ministry: "Pathfinder Club" },
];

export const TRANSACTIONS = [
  { type: "income", category: "Tithes", amount: 185000, date: "2026-09-28", reference: "TIT-0928", description: "Sabbath tithes collection", status: "completed", recorded_by: "Grace Wanjiru" },
  { type: "income", category: "Offerings", amount: 64200, date: "2026-09-28", reference: "OFF-0928", description: "Sabbath offerings", status: "completed", recorded_by: "Grace Wanjiru" },
  { type: "expense", category: "Utilities", amount: 18500, date: "2026-09-25", reference: "EXP-0925", description: "Electricity and water", status: "completed", recorded_by: "Grace Wanjiru" },
  { type: "income", category: "Donations", amount: 45000, date: "2026-09-24", reference: "DON-0924", description: "Building fund donation", status: "completed", recorded_by: "Grace Wanjiru" },
  { type: "expense", category: "Maintenance", amount: 32000, date: "2026-09-22", reference: "EXP-0922", description: "Sound system repair", status: "pending", recorded_by: "Grace Wanjiru" },
  { type: "income", category: "Tithes", amount: 172000, date: "2026-09-21", reference: "TIT-0921", description: "Sabbath tithes collection", status: "completed", recorded_by: "Grace Wanjiru" },
  { type: "expense", category: "Programs", amount: 12000, date: "2026-09-20", reference: "EXP-0920", description: "Children's ministry supplies", status: "approved", recorded_by: "Grace Wanjiru" },
  { type: "income", category: "Offerings", amount: 58300, date: "2026-09-21", reference: "OFF-0921", description: "Sabbath offerings", status: "completed", recorded_by: "Grace Wanjiru" },
  { type: "expense", category: "Salaries", amount: 95000, date: "2026-09-15", reference: "EXP-0915", description: "Staff stipends", status: "pending", recorded_by: "Grace Wanjiru" },
  { type: "income", category: "Donations", amount: 30000, date: "2026-09-14", reference: "DON-0914", description: "Community services donation", status: "completed", recorded_by: "Grace Wanjiru" },
  { type: "expense", category: "Outreach", amount: 22000, date: "2026-09-12", reference: "EXP-0912", description: "Community outreach supplies", status: "completed", recorded_by: "Grace Wanjiru" },
  { type: "income", category: "Tithes", amount: 168000, date: "2026-09-14", reference: "TIT-0914", description: "Sabbath tithes collection", status: "completed", recorded_by: "Grace Wanjiru" },
  { type: "expense", category: "Utilities", amount: 17800, date: "2026-09-08", reference: "EXP-0908", description: "Internet and phone", status: "completed", recorded_by: "Grace Wanjiru" },
  { type: "income", category: "Offerings", amount: 52100, date: "2026-09-07", reference: "OFF-0907", description: "Sabbath offerings", status: "completed", recorded_by: "Grace Wanjiru" },
  { type: "expense", category: "Maintenance", amount: 8500, date: "2026-09-05", reference: "EXP-0905", description: "Plumbing repair", status: "approved", recorded_by: "Grace Wanjiru" },
  { type: "income", category: "Tithes", amount: 190000, date: "2026-08-31", reference: "TIT-0831", description: "Sabbath tithes collection", status: "completed", recorded_by: "Grace Wanjiru" },
];

export const PROJECTS = [
  { name: "Church Roof Renovation", description: "Replacing the aging sanctuary roof with durable, weather-resistant materials.", status: "in_progress", budget: 850000, expenditure: 520000, progress: 65, start_date: "2026-06-01", target_date: "2026-11-30", manager: "Joseph Mutua", category: "Facilities" },
  { name: "Children's Classroom Expansion", description: "Adding two new classrooms to accommodate growing children's ministry enrollment.", status: "planning", budget: 1200000, expenditure: 45000, progress: 10, start_date: "2026-10-15", target_date: "2027-03-31", manager: "Daniel Otieno", category: "Construction" },
  { name: "Sound System Upgrade", description: "Upgrading the sanctuary audio system for clearer worship and livestream quality.", status: "in_progress", budget: 380000, expenditure: 310000, progress: 85, start_date: "2026-08-01", target_date: "2026-10-15", manager: "Brian Ochieng", category: "Equipment" },
  { name: "Parking Lot Paving", description: "Paving the church parking area to improve safety and accessibility.", status: "on_hold", budget: 280000, expenditure: 20000, progress: 5, start_date: "2026-07-01", target_date: "2026-12-15", manager: "Joseph Mutua", category: "Facilities" },
];

export const AUDIT_LOGS = [
  { user: "Mercy Achieng", role: "clerk", action: "member.created", target: "John Kamau", timestamp: "2026-09-28T10:24:00Z", details: "Added new member record" },
  { user: "Esther Nyambura", role: "ministry_leader", action: "event.created", target: "Children's Day", timestamp: "2026-09-27T14:10:00Z", details: "Created ministry event for Oct 17" },
  { user: "Grace Wanjiru", role: "treasurer", action: "transaction.added", target: "EXP-0922", timestamp: "2026-09-22T09:00:00Z", details: "Recorded expense: Sound system repair (KSh 32,000)" },
  { user: "Pr. Samuel Mwangi", role: "pastor", action: "announcement.published", target: "Welcome to our new members", timestamp: "2026-09-28T08:15:00Z", details: "Published church-wide announcement" },
  { user: "Daniel Otieno", role: "church_admin", action: "project.updated", target: "Church Roof Renovation", timestamp: "2026-09-26T16:40:00Z", details: "Updated progress to 65%" },
  { user: "Mercy Achieng", role: "clerk", action: "member.updated", target: "Ruth Adhiambo", timestamp: "2026-09-25T11:30:00Z", details: "Updated membership status to active" },
  { user: "System Administrator", role: "super_admin", action: "user.role_changed", target: "Grace Wanjiru", timestamp: "2026-09-20T13:00:00Z", details: "Assigned Treasurer role" },
  { user: "Brian Ochieng", role: "ministry_leader", action: "attendance.recorded", target: "Youth Sabbath", timestamp: "2026-09-21T17:00:00Z", details: "Recorded attendance for 32 youth" },
];