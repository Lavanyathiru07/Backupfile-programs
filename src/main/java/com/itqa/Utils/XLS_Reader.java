package com.itqa.Utils;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Iterator;

public class XLS_Reader {

    private Workbook workbook;
    private Sheet sheet;

    public XLS_Reader(String path, int sheetIndex) throws Exception{
        workbook = new XSSFWorkbook(new FileInputStream(new File(path)));
        sheet = workbook.getSheetAt(sheetIndex);
    }

    public ArrayList<String> getRowData(int rowNum) {
        ArrayList<String> rData = new ArrayList<String>();
        Row row = sheet.getRow(rowNum);
        Iterator<Cell> iterator = row.iterator();

        while(iterator.hasNext()) {
            Cell cell = iterator.next();
            rData.add(cell.getStringCellValue());
        }

        return rData;
    }

    public String getCellData(int rowNum, int colNum) {
        return sheet.getRow(rowNum).getCell(colNum).getStringCellValue();
    }

    public int getRowCount() {
        return sheet.getLastRowNum() + 1;
    }

}
