import * as XLSX from 'xlsx';

const generateExcel = (assignments, workerSchedule, fileName) => {
    // Crear una nueva hoja para "Assignacions" (días y agentes asignados)
    const assignmentSheet = assignments.map(result => ({
        Dia: result.day,
        Agents: result.agents.join(', '),
    }));

    // Crear una nueva hoja para "Treballadors" (trabajadores y días)
    const workersSheet = workerSchedule.map(worker => ({
        Agents: worker.Agent,
        Dies: worker.Days,
        Total: worker.TotalDays
    }));

    // Crear un libro de trabajo con las hojas
    const wb = XLSX.utils.book_new();
    
    // Añadir la hoja de "Assignacions"
    const wsAssignments = XLSX.utils.json_to_sheet(assignmentSheet);
    XLSX.utils.book_append_sheet(wb, wsAssignments, 'Assignacions');

    // Añadir la hoja de "Treballadors"
    const wsWorkers = XLSX.utils.json_to_sheet(workersSheet);
    XLSX.utils.book_append_sheet(wb, wsWorkers, 'Treballadors');
    
    // Generar el archivo Excel con el nombre adecuado
    XLSX.writeFile(wb, 'Bonus_Arset.xlsx');
};

export default generateExcel;
