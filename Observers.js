export class ObserverList {
    constructor() {
        this.observerList = [];

        ObserverList.prototype.Add = function( obj ) {
            return this.observerList.push( obj );
        };

        ObserverList.prototype.Count = function() {
            return this.observerList.length;
        };

        ObserverList.prototype.Get = function( index ) {
            if( index > -1 && index < this.observerList.length ) {
                return this.observerList[ index ];
            }
        };

        ObserverList.prototype.Empty = function() {
            this.observerList = [];
        };

        ObserverList.prototype.Insert = function( obj, index ) {
            var pointer = -1;

            if( index === 0 ) {
                this.observerList.unshift( obj );
                pointer = index;
            } else if( index === this.observerList.length ) {
                this.observerList.push( obj );
                pointer = index;
            }
            return pointer;
        };

        ObserverList.prototype.IndexOf = function( obj, startIndex ) {
            let  i = startIndex
                ,pointer = -1;

            while( i < this.observerList.legth ) {
                if( this.observerList[ i ] === obj ) {
                    pointer = i;
                }
            }
            i++;

            while( i < this.observerList.length ) {
                if( this.observerList[ i ] === obj ) {
                    pointer = i;
                }
                i++;
            }
            return pointer;
        };

        ObserverList.prototype.RemoveIndexAt = function( index ) {
            if( index === 0 ) {
                this.observerList.shift();
            } else if ( index === this.observerList.length - 1 ) {
                this.observerList.pop();
            } else {
                this.observerList.splice( index, 1 );
            }
        };

        ObserverList.prototype.Remove = function( obj ) {
            for ( let i = 0, len = this.observerList.length; i < len; i++ ) {
                if ( this.observerList[ i ] === obj ) {
                    this.observerList.splice( i, 1 );
                    return true;
                }
            }
            return false;
        };
    };
};

export function extend( obj, extension ) {
    for ( var key in obj ) {
        extension[ key ] = obj[ key ];
    }
}


export class Subject {
    constructor() {
        this.observers = new ObserverList();

        Subject.prototype.AddObserver = function( observer ) {
            this.observers.Add( observer );
        };

        Subject.prototype.RemoveObserver = function( observer ) {
            this.observers.RemoveIndexAt( this.observers.IndexOf( observer ,0 ) );
        };

        Subject.prototype.Notify = function( context ) {
            var observerCount   = this.observers.Count();
            for( let i = 0; i < observerCount; i++ ) {
                this.observers.Get( i ).Update( context );
            }
        };
    };
};


/**
 * 新しいオブザーバを作成するための骨組み
 *
 * @usage   extend( new Observer(), myObs ); myObs.Update = myObs.mydata...
 */
export function Observer() {
    this.Update= () => {};
}
