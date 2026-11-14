const { PrismaClient, DepartmentType } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Mtwapa Central SDA departments...');

  const departments = [
    {
      type: DepartmentType.SABBATH_SCHOOL,
      name: "Sabbath School",
      description: "Systematic Bible study, mission stories, and interactive quarterly discussion groups for children, youth, and adults.",
      leaderName: "Sabbath School Superintendent"
    },
    {
      type: DepartmentType.ADVENTIST_YOUTH,
      name: "Adventist Youth (AY)",
      description: "Empowering young adults and teens through spiritual growth, Pathfinder honors, leadership, and outdoor camps.",
      leaderName: "AY Leader & Council"
    },
    {
      type: DepartmentType.AMO,
      name: "Adventist Men's Organization (AMO)",
      description: "Fostering spiritual leadership among men, family mentorship, community building, and practical church infrastructure support.",
      leaderName: "AMO Leader"
    },
    {
      type: DepartmentType.WOMENS_MINISTRIES,
      name: "Women's Ministries",
      description: "Uplifting, equipping, and nurturing women through prayer circles, health retreats, skills training, and family counseling.",
      leaderName: "Women's Ministries Leader"
    },
    {
      type: DepartmentType.CHILDRENS_MINISTRY,
      name: "Children's Ministry",
      description: "Nurturing children (ages 3–12) in foundational Bible truths, Sabbath songs, memory verses, and VBS summer activities.",
      leaderName: "Children's Coordinator"
    },
    {
      type: DepartmentType.MUSIC_CHOIR,
      name: "Music & Sacred Choirs",
      description: "Leading high-sabbath worship through sanctuary choir hymns, youth praise ensembles, quartets, and instrumental music.",
      leaderName: "Music Director"
    },
    {
      type: DepartmentType.HEALTH_MINISTRIES,
      name: "Health Ministries",
      description: "Promoting physical, mental, and spiritual well-being based on NEWSTART principles, hosting community health expos and medical camps.",
      leaderName: "Health Secretary"
    },
    {
      type: DepartmentType.STEWARDSHIP,
      name: "Stewardship & Development",
      description: "Educating members on faithful tithing, offerings, financial planning, and driving church sanctuary development initiatives.",
      leaderName: "Stewardship Director"
    },
    {
      type: DepartmentType.PERSONAL_MINISTRIES,
      name: "Personal Ministries & Welfare",
      description: "Organizing community outreach, food distribution, visiting the sick, Bible studies, and neighborhood evangelistic campaigns.",
      leaderName: "Personal Ministries Leader"
    },
    {
      type: DepartmentType.COMMUNICATION,
      name: "Communication & Media",
      description: "Managing live streaming, sound production, digital announcements, graphic design, and broadcasting church updates.",
      leaderName: "Communication Director"
    }
  ];

  for (const dept of departments) {
    await prisma.department.upsert({
      where: { type: dept.type },
      update: {},
      create: dept,
    });
  }

  console.log('✨ Successfully seeded all 10 church departments!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
