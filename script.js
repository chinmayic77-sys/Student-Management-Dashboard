
const students = [
    {
        name: "Chinmayi C",
        course: "Information Science",
        skill: "HTML and CSS",
        status: "Learning",
        color: "orange-card",
        message: "Small steps create big progress!"
    },
    {
        name: "Rahul Kumar",
        course: "Computer Science",
        skill: "JavaScript",
        status: "In Progress",
        color: "blue-card",
        message: "Keep coding and growing!"
    },
    {
        name: "Priya Sharma",
        course: "Information Science",
        skill: "Python",
        status: "Completed",
        color: "green-card",
        message: "Great work. Keep it up!"
    },
    {
        name: "Arun Kumar",
        course: "Electronics",
        skill: "Java",
        status: "Learning",
        color: "purple-card",
        message: "Every day is a new opportunity!"
    },
    {
        name: "Sneha R",
        course: "Computer Science",
        skill: "Web Development",
        status: "In Progress",
        color: "blue-card",
        message: "Build something wonderful!"
    }
];

// Select HTML elements using DOM
const heading = document.getElementById("heading");

const profileContainer =
    document.querySelector("#profileContainer");

const studentCount =
    document.getElementById("studentCount");

const courseCount =
    document.getElementById("courseCount");

const skillCount =
    document.getElementById("skillCount");

const progressCount =
    document.getElementById("progressCount");

const welcomeMessage =
    document.getElementById("welcomeMessage");

// Modify the heading and welcome message
heading.textContent = "Student Management Dashboard";

welcomeMessage.textContent =
    "Welcome to CampusConnect! Explore student talents and celebrate learning.";

// Function to create a student card
function createStudentCard(student, index) {

    const card = document.createElement("div");

    card.className = "student-card " + student.color;

    // Unique class for each student
    card.classList.add("student-" + index);

    // Card top
    const cardTop = document.createElement("div");
    cardTop.className = "card-top";

    // Student initials
    const avatar = document.createElement("div");
    avatar.className = "student-avatar";

    const nameParts = student.name.split(" ");

    avatar.textContent =
        nameParts[0].charAt(0) +
        nameParts[nameParts.length - 1].charAt(0);

    cardTop.appendChild(avatar);

    // Card body
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Student name
    const name = document.createElement("h3");
    name.textContent = student.name;

    cardBody.appendChild(name);

    // Course section
    const course = document.createElement("div");
    course.className = "detail";

    const courseLabel = document.createElement("span");
    courseLabel.className = "detail-label";
    courseLabel.textContent = "Course";

    const courseValue = document.createElement("p");
    courseValue.className = "detail-value";
    courseValue.textContent = student.course;

    course.appendChild(courseLabel);
    course.appendChild(courseValue);

    // Skill section
    const skill = document.createElement("div");
    skill.className = "detail";

    const skillLabel = document.createElement("span");
    skillLabel.className = "detail-label";
    skillLabel.textContent = "Primary Skill";

    const skillValue = document.createElement("p");
    skillValue.className = "detail-value";
    skillValue.textContent = student.skill;

    skill.appendChild(skillLabel);
    skill.appendChild(skillValue);

    // Status section
    const statusSection = document.createElement("div");
    statusSection.className = "detail";

    const statusLabel = document.createElement("span");
    statusLabel.className = "detail-label";
    statusLabel.textContent = "Learning Status";

    const statusValue = document.createElement("span");
    statusValue.className = "status";
    statusValue.textContent = student.status;

    if (student.status === "Learning") {
        statusValue.classList.add("status-learning");
    } else if (student.status === "In Progress") {
        statusValue.classList.add("status-progress");
    } else {
        statusValue.classList.add("status-completed");
    }

    statusSection.appendChild(statusLabel);
    statusSection.appendChild(statusValue);

    // Add sections to the card body
    cardBody.appendChild(course);
    cardBody.appendChild(skill);
    cardBody.appendChild(statusSection);

    // Card footer
    const cardFooter = document.createElement("div");
    cardFooter.className = "card-footer";
    cardFooter.textContent = "✦  " + student.message;

    // Add all sections to the card
    card.appendChild(cardTop);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    // Highlight the first student
    if (index === 0) {
        card.classList.add("highlight");
    }

    // Display the card
    profileContainer.appendChild(card);
}

// Generate all five student cards
students.forEach(function(student, index) {
    createStudentCard(student, index);
});

// Remove the fifth student automatically
const fifthStudent =
    document.querySelector(".student-4");

if (fifthStudent) {
    fifthStudent.remove();
}

// Update the dashboard statistics
function updateDashboard() {

    const visibleCards =
        profileContainer.querySelectorAll(".student-card");

    studentCount.textContent = visibleCards.length;

    const courses = new Set();
    const skills = new Set();

    let inProgress = 0;

    visibleCards.forEach(function(card) {

        const studentClass = Array.from(card.classList).find(
            function(className) {
                return /^student-\d+$/.test(className);
            }
        );

        const index = Number(
            studentClass.replace("student-", "")
        );

        const student = students[index];

        courses.add(student.course);
        skills.add(student.skill);

        if (student.status === "In Progress") {
            inProgress++;
        }
    });

    courseCount.textContent = courses.size;
    skillCount.textContent = skills.size;
    progressCount.textContent = inProgress;
}

// Run automatically when the page loads
updateDashboard();
