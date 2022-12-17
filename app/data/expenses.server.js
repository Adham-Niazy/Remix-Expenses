import { prisma } from "./database.server";

function handlingError(err) {
  console.log(err);
  throw err;
}

export async function addExpense(expenseData) {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date)
      }
    })
  } catch (error) {
    handlingError(error);
  }
}

export async function getExpenses() {
  try {
    return await prisma.expense.findMany(
      {
        orderBy:
          { date: 'desc' }
      }
    );
  } catch (error) {
    handlingError(error);
  }
}

export async function deleteExpense(expenseId) {
  try {
    return await prisma.expense.delete({ where: { id: expenseId } });
  } catch (error) {
    handlingError(error);
  }
}

export async function updateExpense(expenseId, expenseData) {
  try {
    return await prisma.expense.update({ 
      where: { id: expenseId },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date)
      }
    });
  } catch (error) {
    handlingError(error);
  }
}