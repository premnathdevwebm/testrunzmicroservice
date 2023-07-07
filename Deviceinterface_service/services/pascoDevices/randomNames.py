import sys, random
from collections import namedtuple
FirstName = namedtuple('FirstName', ['first_name'])
LastName = namedtuple('LastName', ['last_name'])

firstNames = [FirstName('BabyOil'), FirstName('Bigburps')]
lastNames = [LastName('Appleyard'), LastName('Bigmeat')]

random_index1 = random.randint(0, len(firstNames)-1)
random_index2 = random.randint(0, len(lastNames)-1)

random_person = firstNames[random_index1].first_name + " " + lastNames[random_index2].last_name

print(random_person, file=sys.stderr)