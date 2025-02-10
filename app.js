document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("appointment-form");
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

    // ฟังก์ชันเพิ่มนัดหมายใหม่
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // ป้องกันการ reload หน้าเว็บ

        const title = document.getElementById("title").value;
        const date = document.getElementById("date").value;
        const startTime = document.getElementById("startTime").value;

        if (!title || !date || !startTime) return; // ตรวจสอบค่าว่าง

        const newAppointment = {
            id: Date.now().toString(), // สร้าง ID ไม่ซ้ำ
            title,
            date,
            startTime,
            status: "confirmed"
        };

        appointments.push(newAppointment);
        localStorage.setItem("appointments", JSON.stringify(appointments)); // บันทึกลง Local Storage
        renderAppointments(); // อัปเดตตาราง
        form.reset(); // ล้างค่าในฟอร์ม
    });

    renderAppointments(); // โหลดข้อมูลเริ่มต้น
});
