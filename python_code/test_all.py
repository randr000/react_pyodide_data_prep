import unittest
import pandas as pd
from test1 import mult

class TestAll(unittest.TestCase):

    def test_test1(self):
        self.assertEqual(mult(3, 2), 6)

    def test_pandas(self):
        d = {'col1': [1, 2], 'col2': [3, 4]}
        df_1 = pd.DataFrame(data=d)
        df_2 = pd.DataFrame(data=d)
        self.assertTrue(df_1.equals(df_2))

if __name__ == 'main':
    unittest.main()