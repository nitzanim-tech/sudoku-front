const examplecode = `
def find_empty(board):
    indexes = []
    for row in range(len(board)):
        for col in range(len(board[row])):
            if not board[row][col]:
                indexes.append([row, col])
    return indexes


def find_solvable(board):
    empty_list = find_empty(board)
    for empty in empty_list:
        if sum(x is not None for x in board[empty[0]]) == 3:  # check row
            return empty
        if sum(row[empty[1]] is not None for row in board) == 3:  # check col
            return empty


def check_rows(board):
    for row in board:
        if not (None in row):
            for num in range(1, 5):
                if num not in row:
                    return False
    return True


def check_columns(board):
    for col in range(len(board[0])):
        column = [board[row][col] for row in range(len(board))]
        if not (None in column):
            for num in range(1, 5):
                if num not in column:
                    return False
    return True


def is_valid_sudoku(board):
    return check_rows(board) and check_columns(board)


def solve_one(board):
    empty_cell = find_solvable(board)
    for option in range(1, 5):
        board[empty_cell[0]][empty_cell[1]] = option
        if is_valid_sudoku(board):
            return board


if __name__ == "__main__":
    import ast
    sudoku = ast.literal_eval(input())

    while find_empty(sudoku):
        sudoku = solve_one(sudoku)

    print(sudoku)
`;
export { examplecode };
