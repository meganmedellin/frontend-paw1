export function getStatusClass(status) {
  let statusClass = "";

  switch (status) {
    case "Pending":
  statusClass = "status-pending";
      break;
    case "Proses Order":
      statusClass = "status-diterima";
      break;
    case "Ditolak":
      statusClass = "status-ditolak";
      break;
    case "Selesai Order":
      statusClass = "status-selesai";
      break;
    default:
      break;
  }

  return statusClass;
}
