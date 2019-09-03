from django.shortcuts import render, redirect
from django.utils import timezone
from .models import MyGame, Rank
from .forms import RankForm

def home(request):
    return render(request, 'logicgame/home.html', {})

def beginner(request):
    games = MyGame.objects.filter(difficulty__exact=0).order_by('name')
    return render(request, 'logicgame/beginner.html', {
        'games': games
    })

def advanced(request):
    games = MyGame.objects.filter(difficulty__exact=1).order_by('name')
    return render(request, 'logicgame/advanced.html', {
        'games': games
    })

#def makeScore(score, gameName):
#    score = int(score)
#    if gameName=='Number Memorization':
#        return score
#    elif gameName=='Left-Right Card Match':
#        return score
#    elif gameName=='Tile Flip':
#        return score;
#    elif gameName=='Word-Color Match':
#        return score


def rankInput(request, gameName):
    if request.method == 'POST':
        form = RankForm(request.POST)
        if form.is_valid():
            rank = form.save(commit=False)
            rank.date = timezone.now()
            rank.gameName = MyGame.objects.get(name__exact=gameName)
            rank.score = request.POST.get('score', gameName)
            rank.save()
            return redirect('rankDisplay', gameName=rank.gameName)
    else:
        form = RankForm()
    return render(request, 'logicgame/rankInput.html', {
        'form': form
    })

def rankDisplay(request, gameName):
    ranks = Rank.objects.filter(gameName__name__exact=gameName).order_by('-score')[:10]
    return render(request, 'logicgame/rankDisplay.html', {
        'ranks': ranks
    })

def startGame(request, gameName):
    # beginner
    if gameName == 'Number Memorization':
        return render(request, 'logicgame/numMem.html', {})
    elif gameName == 'Left-Right Card Match':
        return render(request, 'logicgame/leftRight.html', {})
    elif gameName == 'Word-Color Match':
        return render(request, 'logicgame/wordColor.html', {})
    elif gameName == 'Tile Flip':
        return render(request, 'logicgame/tileFlip.html', {})
    elif gameName == 'Previous-Current Card Match':
        return render(request, 'logicgame/prevCur.html', {})