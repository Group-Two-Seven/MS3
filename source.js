document.addEventListener("DOMContentLoaded", ()=>{
    const rows = document.querySelectorAll("tr[data-tabname]");

    rows.forEach(row => {
        row.addEventListener("click", () => {
            alert('Tab \'' +row.dataset.tabname+'\' clicked!');
        })
    })
})