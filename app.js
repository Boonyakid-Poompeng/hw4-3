document.addEventListener("DOMContentLoaded", () => {
    const appointmentList = document.getElementById("appointment-list");

    // โหลดข้อมูลจาก Local Storage
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    function renderAppointments() {
        appointmentList.innerHTML = ""; // เคลียร์ตารางก่อนโหลดใหม่
        appointments.forEach((appointment) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="border p-2">${appointment.title}</td>
                <td class="border p-2">${appointment.date}</td>
                <td class="border p-2">${appointment.startTime}</td>
                <td class="border p-2">${appointment.status}</td>
            `;
            appointmentList.appendChild(row);
        });
    }

    renderAppointments(); // เรียกใช้งานตอนโหลดหน้าเว็บ
});
