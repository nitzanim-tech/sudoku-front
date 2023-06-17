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
const exapmleChalengeChode = `
def find_empty(board):
    indexes = []
    for row in range(len(board)):
        for col in range(len(board[row])):
            if not board[row][col]:
                indexes.append([row, col])
    return indexes


def check_vertical(cell, board, n):
    # check if n already existed in vertical (y) axis
    for i in range(9):
        if board[cell[0]][i] == n:
            return False
    return True


def check_horizontal(cell, board, n):
    # check horizontal (x) axis
    for i in range(9):
        if board[i][cell[1]] == n:
            return False
    return True

def check_local_grid(cell, board, n):
    # check the local grid
    x0 = (cell[0]//3)*3
    y0 = (cell[1] // 3) * 3

    for i in range(3):
        for j in range(3):
            if board[x0 + i][y0 + j] == n:
                return False
    return True


def possible_nums(cell, board):
    # check all the possible nums
    num_ls = []
    for i in range(1, 10):
        if check_vertical(cell, board, i) and check_horizontal(cell, board, i) and check_local_grid(cell, board, i):
            num_ls.append(i)
    return num_ls

def solve_suduku(board):
    empty_cells = find_empty(board)
    # base case - no empty cells
    if len(empty_cells) == 0:
        return board # board solved
    cell = empty_cells[0]
    # Try all possible numbers
    cell_options = possible_nums(cell, board)
    for num in cell_options:
        # place the number in current cell
        board[cell[0]][cell[1]] = num

        if solve_suduku(board):
            return board
        board[cell[0]][cell[1]] = None
    return None

def str_to_list(string):
    import ast
    return ast.literal_eval(string)


if __name__ == "__main__":
    suduku = str_to_list(input())
    print(solve_suduku(suduku))
`;
export { examplecode, exapmleChalengeChode };
