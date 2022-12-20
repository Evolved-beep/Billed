/**
 * @jest-environment jsdom
 */

import { screen, fireEvent, waitFor } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { ROUTES, ROUTES_PATH } from "../constants/routes.js"
import { localStorageMock } from "../__mocks__/localStorage.js"
import mockStore from "../__mocks__/store"
import router from "../app/Router.js";
import "@testing-library/jest-dom/extend-expect";
import { data } from "jquery"

jest.mock("../app/store", () => mockStore)


const onNavigate = (pathname) => {
  document.body.innerHTML = ROUTES({pathname})
} 

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {value: localStorageMock})
  window.localStorage.setItem('user', JSON.stringify({
    type: "Employee",
    email: "employee@test.tld"
  }))
})

document.body.innerHTML = NewBillUI()

const newBill = new NewBill({
  document,
  localStorage: window.localStorage,
  onNavigate,
  store:null
})


describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then It should renders NewBill form", () => {
      document.body.innerHTML = NewBillUI()

      const inputExpense = screen.getByTestId("expense-type")
      expect(inputExpense.value).toBe("Transports")

      const inputNameExpense = screen.getByTestId("expense-name")
      expect(inputNameExpense.value).toBe("")

      const inputAmount = screen.getByTestId("amount")
      expect(inputAmount.value).toBe("") 

      const inputDate = screen.getByTestId("datepicker")
      expect(inputDate.value).toBe("")

      const inputVat = screen.getByTestId("vat")
      expect(inputVat.value).toBe("")

      const inputPct = screen.getByTestId("pct")
      expect(inputPct.value).toBe("") 

      const inputCommentary = screen.getByTestId("commentary")
      expect(inputCommentary.value).toBe("")

      const inputFile = screen.getByTestId("file")
      expect(inputFile.value).toBe("")
    })
  })

  describe("When I am entering value on NewBill Page", () => {
    test("Then I could send the NewBill form", async () => {
      document.body.innerHTML = NewBillUI()
      const handleFile = jest.fn(newBill.handleChangeFile)
      const dataValue = {
        name: 'Achat de bien',
       /*  date: "2021/04/25", */
        amount : 130,
        vat: 40, 
        pct: 20,
        commentary : 'Excellent produit',
      }

      const expenseName = screen.getByTestId("expense-name")
      fireEvent.change(expenseName, {target: { value: dataValue.name}})
      expect(expenseName.value).toBe(dataValue.name)

      /* const expenseDate = screen.getByTestId("datepicker")
      fireEvent.change(expenseDate, {target: {value:dataValue.date}})
      expect(expenseDate.value).toBe(dataValue.date) */

      const expenseAmount = screen.getByTestId("amount")
      fireEvent.change(expenseAmount, {target: {value: dataValue.amount}})
      expect(parseInt(expenseAmount.value)).toBe(dataValue.amount) 

      const inputVat = screen.getByTestId("vat")
      fireEvent.change(inputVat, {target: { value: dataValue.vat }})
      expect(parseInt(inputVat.value)).toBe(dataValue.vat)

      const inputPct = screen.getByTestId("pct")
      fireEvent.change(inputPct, {target: {value: dataValue.pct}})
      expect(parseInt(inputPct.value)).toBe(dataValue.pct)

      const inputCommentary = screen.getByTestId("commentary")
      fireEvent.change(inputCommentary, {target: {value:dataValue.commentary}})
      expect(inputCommentary.value).toBe(dataValue.commentary)

      const inputFile = screen.getByTestId("file")
      fireEvent.change(inputFile, {target: {files:[new File(['image.png'], 'image.png', { type: 'image/png'})]}})
      inputFile.addEventListener("change",handleFile)

      const form = screen.getByTestId("form-new-bill")
      const newBillSend = new NewBill({ document, onNavigate, store: mockStore, localStorage: window.localStorage })
      const handleFormSubmit = jest.fn(newBillSend.handleSubmit)
      form.addEventListener("submit", handleFormSubmit)
      fireEvent.submit(form)
      expect(handleFormSubmit).toHaveBeenCalled()
    })
  }) 
})
  describe("Given I am connected as an Employee", () => {
    describe("When an error occures in the file input", () => {
      test("Then it should renders an alert with an error message" , () => {
        document.body.innerHTML = NewBillUI()
        const handleFile = jest.fn(newBill.handleChangeFile)
        const fileInput = screen.getByTestId("file")
        const fileRejected = new File(["test"], {
          type: 'mp4'
        })
        fileInput.addEventListener("change", handleFile)
        fireEvent.change(fileInput, {target: {files: [fileRejected]}})
        expect(handleFile).toHaveBeenCalled()
        expect(window.alert).toBeTruthy()
        
      })
    })
  })
  describe("test", () => {
  describe("When test", () =>{
    test("test",async() => {
      const newBill = { "id": "47qAXb6fIm2zOKkLzMro",
      "vat": "80",
      "fileUrl": "https://test.storage.tld/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=c1640e12-a24b-4b11-ae52-529112e9602a",
      "status": "pending",
      "type": "Hôtel et logement",
      "commentary": "séminaire billed",
      "name": "encore",
      "fileName": "preview-facture-free-201801-pdf-1.jpg",
      "date": "2004-04-04",
      "amount": 400,
      "commentAdmin": "ok",
      "email": "a@a",
      "pct": 20} 

      const getSpy = jest.spyOn(mockStore,"post")
      await mockStore.post(newBill)
      expect(getSpy).toHaveBeenCalledTimes(1)
      expect(getSpy).toHaveBeenLastCalledWith(newBill)

    })
  } )
  })
