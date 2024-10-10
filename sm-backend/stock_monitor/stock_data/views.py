from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import DailyStock
from django.utils.timezone import now
from datetime import timedelta, datetime
from django.db.models import Max, Min, F, ExpressionWrapper, FloatField, Subquery, OuterRef
from django.core.cache import cache



#for prometheus
from prometheus_client import generate_latest, Gauge, CollectorRegistry
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import HttpResponse


# from django.shortcuts import render, redirect
# from django.contrib.auth import login, authenticate, logout
# from django.contrib.auth.forms import AuthenticationForm
# from .forms import UserRegisterForm


def daily_closing_price(request):
    stocks = DailyStock.objects.all().values('symbol', 'date', 'close')
    return JsonResponse(list(stocks), safe=False)


# def price_change_percentage(request):
#     periods = {
#         '24h': timedelta(days=1),
#         '30d': timedelta(days=30),
#         '1y': timedelta(days=365),
#     }
#     results = {}
#     today = datetime.now().date()

#     for period, delta in periods.items():
#         start_date = today - delta
#         stocks = DailyStock.objects.filter(date__gte=start_date).values('symbol').annotate(
#             start_price=Min('open'),
#             end_price=Max('close'),
#             current_price=Max('close'),  # Latest close price
#             start_date=Min('date'),
#             end_date=Max('date')
#         ).annotate(
#             percentage_change=ExpressionWrapper(
#                 (F('end_price') - F('start_price')) / F('start_price') * 100,
#                 output_field=FloatField()
#             )
#         ).values('symbol', 'percentage_change', 'current_price', 'start_date', 'end_date')
        
#         results[period] = list(stocks)
    
#     return JsonResponse(results)




#     return JsonResponse(results)


# def price_change_percentage(request):
#     periods = {
#         '24h': timedelta(days=1),
#         '30d': timedelta(days=30),
#         '1y': timedelta(days=365),
#     }
#     results = {}
#     today = datetime.now().date()

#     # Define a cache key for the current request
#     cache_key = f"price_change_percentage_{today}"

#     # Try to get cached data
#     cached_results = cache.get(cache_key)
#     if cached_results:
#         return JsonResponse(cached_results)

#     for period, delta in periods.items():
#         start_date = today - delta

#         # Subquery to get the closing price at the start of the period
#         start_price_subquery = DailyStock.objects.filter(
#             symbol=OuterRef('symbol'),
#             date__gte=start_date
#         ).order_by('date').values('close')[:1]

#         # Subquery to get the closing price at the end of the period (latest date)
#         end_price_subquery = DailyStock.objects.filter(
#             symbol=OuterRef('symbol'),
#             date__gte=start_date
#         ).order_by('-date').values('close')[:1]

#         # Annotate and calculate percentage change
#         stocks = DailyStock.objects.filter(date__gte=start_date).values('symbol').annotate(
#             start_price=Subquery(start_price_subquery),
#             end_price=Subquery(end_price_subquery),
#             percentage_change=ExpressionWrapper(
#                 (F('end_price') - F('start_price')) / F('start_price') * 100,
#                 output_field=FloatField()
#             )
#         ).annotate(
#             current_price=Max('close'),
#             start_date=Min('date'),
#             end_date=Max('date')
#         ).values('symbol', 'percentage_change', 'current_price', 'start_date', 'end_date')

#         results[period] = list(stocks)

#     # Cache the results for 1 hour
#     cache.set(cache_key, results, timeout=3600)

#     return JsonResponse(results)



def price_change_percentage(request):
    periods = {
        '24h': timedelta(days=1),
        '30d': timedelta(days=30),
        '1y': timedelta(days=365),
    }
    results = {}
    today = datetime.now().date()

    # Define a cache key for the current request
    cache_key = f"price_change_percentage_{today}"

    # Try to get cached data
    cached_results = cache.get(cache_key)
    if cached_results:
        return JsonResponse(cached_results)

    for period, delta in periods.items():
        start_date = today - delta

        # Use Min/Max approach for 24h (as it works well for short periods)
        if period == '24h':
            stocks = DailyStock.objects.filter(date__gte=start_date).values('symbol').annotate(
                start_price=Min('open'),
                end_price=Max('close'),
                current_price=Max('close'),  # Latest close price
                start_date=Min('date'),
                end_date=Max('date')
            ).annotate(
                percentage_change=ExpressionWrapper(
                    (F('end_price') - F('start_price')) / F('start_price') * 100,
                    output_field=FloatField()
                )
            ).values('symbol', 'percentage_change', 'current_price', 'start_date', 'end_date')
        else:
            # Use subqueries approach for longer periods (30d, 1y)
            start_price_subquery = DailyStock.objects.filter(
                symbol=OuterRef('symbol'),
                date__gte=start_date
            ).order_by('date').values('close')[:1]

            end_price_subquery = DailyStock.objects.filter(
                symbol=OuterRef('symbol'),
                date__gte=start_date
            ).order_by('-date').values('close')[:1]

            stocks = DailyStock.objects.filter(date__gte=start_date).values('symbol').annotate(
                start_price=Subquery(start_price_subquery),
                end_price=Subquery(end_price_subquery),
                percentage_change=ExpressionWrapper(
                    (F('end_price') - F('start_price')) / F('start_price') * 100,
                    output_field=FloatField()
                )
            ).annotate(
                current_price=Max('close'),
                start_date=Min('date'),
                end_date=Max('date')
            ).values('symbol', 'percentage_change', 'current_price', 'start_date', 'end_date')

        results[period] = list(stocks)

    # Cache the results for 1 hour
    cache.set(cache_key, results, timeout=3600)

    return JsonResponse(results)




def top_gainers_losers(request):
    today = datetime.now().date()
    start_date = today - timedelta(days=1)

    stock_changes = DailyStock.objects.filter(date__range=[start_date, today]).values('symbol').annotate(
        start_price=Min('open'),
        end_price=Max('close')
    ).annotate(
        percentage_change=ExpressionWrapper(
            (F('end_price') - F('start_price')) / F('start_price') * 100,
            output_field=FloatField()
        )
    ).order_by('-percentage_change')

    top_gainers = stock_changes[:10]
    top_losers = stock_changes[::-1][:10]

    return JsonResponse({
        'top_gainers': list(top_gainers),
        'top_losers': list(top_losers)
    })


# def top_gainers_losers(request):
#     today = datetime.now().date()
#     start_date = today - timedelta(days=1)

#     # Subquery to get the opening price of the stock at the start of the period
#     start_price_subquery = DailyStock.objects.filter(
#         symbol=OuterRef('symbol'),
#         date__gte=start_date
#     ).order_by('date').values('close')[:1]

#     # Subquery to get the closing price of the stock at the end of the period
#     end_price_subquery = DailyStock.objects.filter(
#         symbol=OuterRef('symbol'),
#         date__lte=today
#     ).order_by('-date').values('close')[:1]

#     stock_changes = DailyStock.objects.filter(
#         date__range=[start_date, today]
#     ).values('symbol').annotate(
#         start_price=Subquery(start_price_subquery),
#         end_price=Subquery(end_price_subquery)
#     ).annotate(
#         percentage_change=ExpressionWrapper(
#             (F('end_price') - F('start_price')) / F('start_price') * 100,
#             output_field=FloatField()
#         )
#     ).order_by('-percentage_change')

#     # Top gainers
#     top_gainers = stock_changes[:10]
    
#     # Top losers (sorted in ascending order of percentage change)
#     top_losers = stock_changes.order_by('percentage_change')[:10]

#     return JsonResponse({
#         'top_gainers': list(top_gainers),
#         'top_losers': list(top_losers)
#     })


# def top_gainers_losers(request):
#     today = datetime.now().date()
#     start_date = today - timedelta(days=1)

#     # Subquery to get the opening price of the stock at the start of the period
#     start_price_subquery = DailyStock.objects.filter(
#         symbol=OuterRef('symbol'),
#         date__gte=start_date
#     ).order_by('date').values('close')[:1]

#     # Subquery to get the closing price of the stock at the end of the period
#     end_price_subquery = DailyStock.objects.filter(
#         symbol=OuterRef('symbol'),
#         date__lte=today
#     ).order_by('-date').values('close')[:1]

#     # Aggregate the data
#     stock_changes = DailyStock.objects.filter(
#         date__range=[start_date, today]
#     ).values('symbol').annotate(
#         start_price=Subquery(start_price_subquery),
#         end_price=Subquery(end_price_subquery),
#         percentage_change=ExpressionWrapper(
#             (F('end_price') - F('start_price')) / F('start_price') * 100,
#             output_field=FloatField()
#         )
#     ).annotate(
#         current_price=Max('close'),
#         start_date=Max('date'),
#         end_date=Max('date')
#     ).distinct().order_by('-percentage_change')

#     # Top gainers
#     top_gainers = stock_changes[:10]
    
#     # Top losers (sorted in ascending order of percentage change)
#     top_losers = stock_changes.order_by('percentage_change')[:10]

#     return JsonResponse({
#         'top_gainers': list(top_gainers),
#         'top_losers': list(top_losers)
#     })


#for prometheus
# @csrf_exempt
# def stock_metrics(request):
#     # Create a new registry for our custom metrics
#     registry = CollectorRegistry()

#     # Create a gauge metric for stock prices
#     stock_price_gauge = Gauge('stock_price', 'Current stock price', ['symbol', 'date'], registry=registry)

#     # Fetch the latest stock prices from your model
#     latest_stocks = DailyStock.objects.all().values('symbol', 'date', 'close')

#     for stock in latest_stocks:
#         stock_price_gauge.labels(symbol=stock['symbol'], date=stock['date']).set(stock['close'])

#     # Generate the latest metrics data
#     metrics_data = generate_latest(registry)

#     return HttpResponse(metrics_data, content_type='text/plain')

@csrf_exempt
def stock_metrics(request):
    registry = CollectorRegistry()
    stock_price_gauge = Gauge('stock_price', 'Current stock price', ['symbol', 'date'], registry=registry)

    latest_stocks = DailyStock.objects.all().values('symbol', 'date', 'close')

    for stock in latest_stocks:
        stock_price_gauge.labels(symbol=stock['symbol'], date=stock['date']).set(stock['close'])

    metrics_data = generate_latest(registry)
    return HttpResponse(metrics_data, content_type='text/plain')