import sys, random
first = ('BabyOil', 'Bigburps')
last = ('Appleyard', 'Bigmeat')
while True:
    firstName = random.choice(first)
    lastName = random.choice(last)
    random_person = "{} {}".format(firstName, lastName)
    print(random_person, file=sys.stderr)
    print("\n\n")
    try_again = input("\n\nTry Again? (press enter else n to quit)\n")
    if try_again.lower() == "n":
        break