from django import forms
from .models import Rank

class RankForm(forms.ModelForm):
    score = forms.IntegerField(
        widget=forms.TextInput(attrs={'readonly': 'readonly'})
    )

    class Meta:
        model = Rank
        fields = ('userID',)