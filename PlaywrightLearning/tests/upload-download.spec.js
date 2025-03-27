const ExcelJs = require('exceljs');
const {test,expect} = require('@playwright/test'); 
//it support both xlsx & json - npm install exceljs --savedev
async function writeexcelTest(searchtext,replacetext,change,filePath){
    
const workbook = new ExcelJs.Workbook();
await workbook.xlsx.readFile(filePath); 
const worksheet = workbook.getWorksheet('Sheet1');
const output = await readExcel(worksheet,searchtext);
const cell = worksheet.getCell(output.row, output.column+change.colChange);
cell.value = replacetext;
await workbook.xlsx.writeFile(filePath);
}
async function readExcel(worksheet,searchtext){
    let output ={row:-1,column:-1};
    worksheet.eachRow((row,rowNumber)=>{ //row variable holds the information & rowNumber maps to number
        row.eachCell( (cell,colNumber)=>{
            if(cell.value===searchtext)
            {
                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    })
    return output;
}
 //writeexcelTest("Mango","Rabbit",{rowChange:0,colChange:2},"C:\\Users\\E006846\\Downloads\\exceltest.xlsx")
//writeexcelTest("Rabbit",350,{rowChange:0,colChange:2},"C:\\Users\\E006846\\Downloads\\exceltest.xlsx")
test('Upload download excel validation',async ({page})=>{
    const testSearch = 'Mango';
    const updatevalue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole("button",{name:'Download'}).click();
    writeexcelTest("Mango",350,{rowChange:0,colChange:2},"C:\\Users\\E006846\\Downloads\\download.xlsx");
    await downloadPromise;
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:\\Users\\E006846\\Downloads\\download.xlsx");
    const textlocator =  page.getByText(testSearch);
    const desiredrow = await page.getByRole('row').filter({has:textlocator});
    await expect(desiredrow.locator("#cell-4-undefined")).toContainText(updatevalue);
});