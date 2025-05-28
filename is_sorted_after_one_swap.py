def is_sorted_after_one_swap(arr: list[int]) -> bool:
    """
    Checks whether the given list can be sorted by at most one swap of two elements.
    """
    n = len(arr)
    bad = []

    for i in range(n - 1):
        if arr[i] > arr[i + 1]:
            bad.append(i)

    if len(bad) == 0:
        return True  # already sorted
    if len(bad) > 2:
        return False

    i = bad[0]
    j = bad[-1] + 1

    arr[i], arr[j] = arr[j], arr[i]
    return arr == sorted(arr)
