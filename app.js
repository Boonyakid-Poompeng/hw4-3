document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("appointment-form");
    const appointmentList = document.getElementById("appointment-list");

    // โหลดข้อมูลจาก Local Storage
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    function renderAppointments() {
        appointmentList.innerHTML = ""; // เคลียร์ตารางก่อนโหลดใหม่
        appointments.forEach((appointment) => {
            const isConflict = checkTimeConflict(appointment.date, appointment.startTime);

            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="border p-2 ${appointment.status === "cancelled" ? "line-through text-gray-500" : ""}">
                    ${appointment.title} ${isConflict ? "⚠️" : ""}
                </td>
                <td class="border p-2 ${appointment.status === "cancelled" ? "line-through text-gray-500" : ""}">${appointment.date}</td>
                <td class="border p-2 ${appointment.status === "cancelled" ? "line-through text-gray-500" : ""}">${appointment.startTime}</td>
                <td class="border p-2">${appointment.status}</td>
                <td class="border p-2">
                    <button class="bg-red-500 text-white p-1 rounded" onclick="cancelAppointment('${appointment.id}')">ยกเลิก</button>
                </td>
            `;
            if (isConflict) {
                row.classList.add("bg-yellow-200"); // เปลี่ยนสีแถวถ้ามีการชนกัน
            }
            appointmentList.appendChild(row);
        });
    }

    // ฟังก์ชันตรวจสอบเวลาซ้ำ
    function checkTimeConflict(date, startTime) {
        return appointments.some(app => app.date === date && app.startTime === startTime && app.status !== "cancelled");
    }

    // ฟังก์ชันเพิ่มนัดหมายใหม่
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const date = document.getElementById("date").value;
        const startTime = document.getElementById("startTime").value;

        if (!title || !date || !startTime) return;

        const newAppointment = {
            id: Date.now().toString(),
            title,
            date,
            startTime,
            status: "confirmed"
        };

        appointments.push(newAppointment);
        localStorage.setItem("appointments", JSON.stringify(appointments));
        renderAppointments();
        form.reset();
    });

    // ฟังก์ชันยกเลิกนัดหมาย
    window.cancelAppointment = (id) => {
        appointments = appointments.map(app =>
            app.id === id ? { ...app, status: "cancelled" } : app
        );
        localStorage.setItem("appointments", JSON.stringify(appointments));
        renderAppointments();
    };

    renderAppointments();
});
