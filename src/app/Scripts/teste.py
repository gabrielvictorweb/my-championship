import random

scoreFirstTeam = random.randrange(0, 8, 1)
scoreSecondTeam = random.randrange(0, 8, 1)

response = '{"firstTeam": %i, "secondTeam": %i}' % (scoreFirstTeam, scoreSecondTeam)

print(response)
