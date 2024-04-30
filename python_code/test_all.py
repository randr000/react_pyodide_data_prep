import unittest
import pandas
from test1 import mult

class TestAll(unittest.TestCase):

    def test_test1(self):
        self.assertEqual(mult(3, 2), 6)

if __name__ == 'main':
    unittest.main()